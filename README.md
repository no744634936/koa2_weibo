查看profile.test.js 文件。




这里有一个错误

server error [Error [TemplateError]: template not found: Cannot read property 'value' of null]


应该是使用template方法将html转换成字符串的时候，jest跟 art-template 不兼容？
