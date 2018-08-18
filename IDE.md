# Visual Studio Code
## Debug
* Cancel any node process in Integrate Terminal
* Menu Bar > View > Debug
* Ensure default configuration is set to Node.js
	* Sample launch.json
		{
			"version": "0.2.0",
			"configurations": [
				{
					"name": "Launch Program",
					"type": "node",
					"request": "launch",
					"program": "${workspaceRoot}\\app-teacher.js",
					"cwd": "${workspaceRoot}"
				}
			]
		}

* Set breakpoint on file (i.e. server.js)
	* Click mouse in left gutter of line number
* Press Start Debugging green arrow button

## ESLint
![ESLint Extension](https://github.com/VanArts/course-files/blob/master/public/assets/visualStudioCode/extension-eslint.png)

## Editorconfig
![.editorconfig Extension](https://github.com/VanArts/course-files/blob/master/public/assets/visualStudioCode/extension-editorconfig.png)

## Remote sharing
* [Visual Studio Code Share](https://docs.microsoft.com/en-us/visualstudio/liveshare/use/vscode)

# Atom
## Editorconfig
* [LF line ending](https://github.com/atom/line-ending-selector/issues/5#issuecomment-254846516)

# Sublime Text
* Install Sublime Text [package manager](https://packagecontrol.io/installation)
