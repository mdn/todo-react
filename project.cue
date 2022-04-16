package todoapp

import (
	"dagger.io/dagger"
	"universe.dagger.io/netlify"
)

dagger.#Plan & {
	client: {
		filesystem: "build": write: contents: actions.dev.build.output
		env: {
			NETLIFY_TOKEN: dagger.#Secret
		}
	}
	actions: {
		// Automate development tasks: build, test, deploy
		dev: {
			#TodoAppDev

			// Deploy the dev build to Netlify
			deploy: netlify.#Deploy & {
				contents: dev.build.output
				token:    client.env.NETLIFY_TOKEN
			}
		}
	}
}
