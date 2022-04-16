package todoapp

import (
	"strings"

	"dagger.io/dagger"
	"dagger.io/dagger/core"

	"universe.dagger.io/alpine"
	"universe.dagger.io/bash"
)


// A ready-to-use dev environment for todoapp-react.
// Add as an action anywhere in your project.
//
// Included sub-actions:
//   * 'install': Install app dependencies
//   * 'build': build the app
//   * 'test': run the app tests (if not tests, will return an error)
//  TOTO: add a sub-action to deploy the app.
#TodoAppDev: {
	source: _source.output
	_source: core.#Source & {
		path: "."
		exclude: [
			"node_modules",
			"_build",
			"*.cue",
			"*.md",
			".git",
		]
	}

	// Install app dependencies
	install: #Yarn & {
		args: ["install"]
		"source": source
	}
	// Build the application
	build: #Yarn & {
		requires: [install.id]
		args: ["run", "build"]
		"source": source
	}
	// Test the application
	test: #Yarn & {
		requires: [install.id]
		args: ["run", "test"]
		// This environment variable disables watch mode
		// in "react-scripts test".
		// We don't set it for all commands, because it causes warnings
		// to be treated as fatal errors.
		// See https://create-react-app.dev/docs/advanced-configuration/
		container: env: CI: "true"
		"source": source
	}
}

// Run a yarn command or script
#Yarn: {
	// Source code to build
	source: dagger.#FS

	// Arguments to yarn
	args: [...string]

	// Project name, used for cache scoping
	project: string | *"default"

	// Path of the yarn script's output directory
	// May be absolute, or relative to the workdir
	outputDir: string | *"./build"

	// Output directory
	output: container.export.directories."/output"

	// Logs produced by the yarn script
	logs: container.export.files."/logs"

	// Other actions required to run before this one
	requires: [...#ActionID]

	// Unique ID for this action
	//   Note: this is not an official Dagger API, it is a workaround
	//   to the lack of explicit requirements.
	id: #ActionID & container.export.files."/id"

	container: bash.#Run & {
		input:  _image.output
		_image: alpine.#Build & {
			packages: {
				bash: {}
				yarn: {}
				git: {}
			}
		}

		"args":  args
		workdir: "/src"
		mounts: Source: {
			dest:     "/src"
			contents: source
		}
		script: contents: """
			echo "$RANDOM" > /id
			yarn "$@" | tee /logs
			if [ -e "$YARN_OUTPUT_FOLDER" ]; then
				mv "$YARN_OUTPUT_FOLDER" /output
			else
				mkdir /output
			fi
			"""
		export: {
			directories: "/output": dagger.#FS
			files: {
				"/logs": string
				"/id":   string
			}
		}

		// Setup caching
		env: {
			YARN_CACHE_FOLDER:  "/cache/yarn"
			YARN_OUTPUT_FOLDER: outputDir
			REQUIRES:           "\(strings.Join(requires, "__"))"
		}
		mounts: {
			"Yarn cache": {
				dest:     "/cache/yarn"
				contents: core.#CacheDir & {
					id:          "\(project)-yarn"
					concurrency: "shared"
				}
			}
			"NodeJS cache": {
				dest:     "/src/node_modules"
				type:     "cache"
				contents: core.#CacheDir & {
					id:          "\(project)-nodejs"
					concurrency: "shared"
				}
			}
		}
	}
}

#ActionID: string
