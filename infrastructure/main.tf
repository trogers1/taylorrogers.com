terraform {
  backend "s3" {
    bucket         = "tf-remote-backend-20200116162206543800000002" # Universal remote state bucket for terraform operations
    dynamodb_table = "tf-remote-state-locks"                        # Universal remote state lock table for the career coach team terraform operations
    encrypt        = true                                           # Encrypt files in this bucket at rest
    key            = "taylor-rogers/route53/terraform.tfstate"      # The path in the s3 bucket to store the state file
    region         = "us-west-2"
    profile        = "personal_admin"
  }
}

provider "aws" {
  region  = "us-west-2" # You may want a different region
  profile = var.aws_profile
  version = "~>v2.44.0"
}

variable "aws_profile" {
  default = "personal_admin" # You probably need to change this
}

resource "aws_route53_zone" "tf-taylor-rogers-com-hosted-zone" {
  comment       = "My personal site"
  force_destroy = "false"
  name          = "taylor-rogers.com."
  tags = {
    old-tf-name = "tfer--Z29K5U4K7H1KG3_taylor-002D-rogers-002E-com"
  }
}

# resource "aws_s3_bucket" "static-resources" {
#   # don't know how to set this up yet.
# }
