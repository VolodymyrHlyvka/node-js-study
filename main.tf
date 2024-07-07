provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "terraform-mongo-instance" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name = "terraform-mongo-instance"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo yum update -y
              sudo amazon-linux-extras install docker -y
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              docker pull mongo:latest
              docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo:latest
              EOF
}

resource "aws_ssm_document" "update_mongo" {
  name          = "UpdateMongoDockerImage"
  document_type = "Command"

  content = <<-DOC
    {
      "schemaVersion": "2.2",
      "description": "Pull the latest MongoDB Docker image and restart the container",
      "mainSteps": [
        {
          "action": "aws:runShellScript",
          "name": "updateMongoImage",
          "inputs": {
            "runCommand": [
              "docker pull mongo:latest",
              "docker stop mongodb",
              "docker rm mongodb",
              "docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=example mongo:latest"
            ]
          }
        }
      ]
    }
  DOC
  lifecycle {
    create_before_destroy = true
  }
}


output "ec2_instance_id" {
  value = aws_instance.terraform-mongo-instance.id
}
