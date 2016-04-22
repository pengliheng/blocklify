/**
 * @license
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview demo for blocklify.
 * @author carloslfu@gmail.com (Carlos Galarza)
 */
'use strict';

var mainWorkspace;

document.addEventListener("DOMContentLoaded", function() {
	var blockly_div = document.getElementById('blocklyDiv');
	var toolbox_div = document.createElement('div');
	//Loads toolbox for JavaScript
	toolbox_div.innerHTML = Blocklify.JavaScript.toolbox;
	document.body.appendChild(toolbox_div);
	mainWorkspace = Blockly.inject(blockly_div,
          {
            toolbox: toolbox,
            media: "../blockly/media/",
            zoom: {
              controls: true,
              wheel: true,
              startScale: 1.0,
              maxScale: 3,
              minScale: 0.3,
              scaleSpeed: 1.2},
          });

  // charges the example code
  document.getElementById('code').value = exampleCode;
});

var delete_all_blocks = function() {
	mainWorkspace.getTopBlocks().forEach(function (el) {
		el.dispose();
	});
};

var parse_code = function () {
	delete_all_blocks();
	var javascript_code = document.getElementById('code').value;
	var xmlDom = Blocklify.JavaScript.importer.codeToDom(javascript_code, 'atomic');
	Blockly.Xml.domToWorkspace(xmlDom, mainWorkspace);
};

var parse_blocks = function () {
	var output = document.getElementById('code');
  	output.value = Blocklify.JavaScript.Generator.workspaceToCode(mainWorkspace);
};

var exampleCode = 
  "var product = 1;\n" +
  "var factorial = 1;\n" +
  "var A = 10;\n" +
  "var B = 4;\n" +
  "\n" +
  "for (var count = 0; count < B; count++) {\n" +
  "  product = product * A;\n" +
  "}\n" +
  "if (B < 0) {\n" +
  "  factorial = 0;\n" +
  "} else {\n" +
  "  for (var i = 1; i <= A; i++) {\n" +
  "    factorial = factorial * i;\n" +
  "  }\n" +
  "}\n";
