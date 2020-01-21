resource "aws_route53_record" "tf-taylor-rogers-com-validation-cname" {
  name    = "_5fc371bf9b288c7645483a6d8e1bef45.taylor-rogers.com."
  records = ["_d6c490b9d0f4841a615c2dbc9a197f8b.kirrbxfjtw.acm-validations.aws."]
  ttl     = "500"
  type    = "CNAME" # "Cononical name"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name = "tfer--Z29K5U4K7H1KG3__5fc371bf9b288c7645483a6d8e1bef45-002E-taylor-002D-rogers-002E-com-002E-_CNAME_"
}

resource "aws_route53_record" "tf-taylor-rogers-com-qa-cname" {
  name    = "qa.taylor-rogers.com."
  records = ["d2q8888favabiu.cloudfront.net"]
  ttl     = "500"
  type    = "CNAME" # "Cononical name"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name = "tfer--Z29K5U4K7H1KG3_qa-002E-taylor-002D-rogers-002E-com-002E-_CNAME_"
}

resource "aws_route53_record" "tf-taylor-rogers-com-address" {
  alias {
    evaluate_target_health = "false"
    name                   = "d2q8888favabiu.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
  }

  name    = "taylor-rogers.com."
  type    = "A" # "IPv4 Address"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name = "tfer--Z29K5U4K7H1KG3_taylor-002D-rogers-002E-com-002E-_A_"
}

resource "aws_route53_record" "tf-taylor-rogers-com-name-server" {
  name    = "taylor-rogers.com."
  records = ["ns-949.awsdns-54.net.", "ns-115.awsdns-14.com.", "ns-1498.awsdns-59.org.", "ns-2009.awsdns-59.co.uk."]
  ttl     = "172800"
  type    = "NS" # "Name server"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name: "tfer--Z29K5U4K7H1KG3_taylor-002D-rogers-002E-com-002E-_NS_"
}

resource "aws_route53_record" "tf-taylor-rogers-com-soa" {
  name    = "taylor-rogers.com."
  records = ["ns-115.awsdns-14.com. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400"]
  ttl     = "900"
  type    = "SOA" # "Start of authority"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name = "tfer--Z29K5U4K7H1KG3_taylor-002D-rogers-002E-com-002E-_SOA_"
}

resource "aws_route53_record" "tf-www-taylor-rogers-com-alias" {
  alias {
    evaluate_target_health = "false"
    name                   = "d2q8888favabiu.cloudfront.net"
    zone_id                = "Z2FDTNDATAQYW2"
  }

  name    = "www.taylor-rogers.com."
  type    = "A" # "IPv4 Address"
  zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
  # old tf resource name = "tfer--Z29K5U4K7H1KG3_taylor-002D-rogers-002E-com-002E-_A_"
}

# resource "aws_route53_record" "tf-taylor-rogers-com-www-cname" {
#   name    = "www.taylor-rogers.com."
#   records = ["d2q8888favabiu.cloudfront.net"]
#   ttl     = "500"
#   type    = "CNAME" # "Cononical name"
#   zone_id = aws_route53_zone.tf-taylor-rogers-com-hosted-zone.zone_id
#   # old tf resource name = "tfer--Z29K5U4K7H1KG3_www-002E-taylor-002D-rogers-002E-com-002E-_CNAME_"
# }

# # Certificate creation
# resource "aws_acm_certificate" "cert" {
#   domain_name       = "*.taylor-rogers.com"
#   validation_method = "DNS"

#   lifecycle {
#     create_before_destroy = true
#   }

#   tags = {
#     Description = "Used on the ELB for the Skills Match FE application"
#     Name        = "Skills Match Application Certificate"
#   }
# }

# # Create Cert Record
# resource "aws_route53_record" "cert_validation" {
#   name    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
#   type    = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
#   zone_id = aws_route53_zone.hosted_zone.zone_id
#   records = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
#   ttl     = 60
# }

# # Checks that Certification is Valid
# resource "aws_acm_certificate_validation" "cert" {
#   certificate_arn         = "${aws_acm_certificate.cert.arn}"
#   validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
# }
