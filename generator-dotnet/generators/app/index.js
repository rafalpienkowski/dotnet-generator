var Generator = require('yeoman-generator');
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();

class ProjectGenerator extends Generator {
    
    paths() {
        this.templatePath('')
    }

    async prompting() {
        this.answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname
            }
        ]);
    }


  writing() {

    this.fs.copyTpl(
      this.templatePath('service.csproj'),
      this.destinationPath(`${this.answer.name}/${this.answer.name}.csproj`)
    )

    this.fs.copyTpl(
      this.templatePath('service.cs'),
      this.destinationPath(`${this.answer.name}/sevice.cs`), 
      { name: this.answer.name }
    );
  }

  end() {
   this.spawnCommand('dotnet', ['restore', `./${this.answer.name}/`]);
  }

}


module.exports = ProjectGenerator;
