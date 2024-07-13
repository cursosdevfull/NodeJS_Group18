// Iaas: AWS, Azure, Google Cloud
// Paas: DigitalOcean, Linode

interface Iaas {
  serverType: string;
  containerRegistry: string;
  isServerless: boolean;
}

interface Paas {
  containerRegistry: string;
  isServerless: boolean;
  marketApp: string;
}

class AWS implements Iaas {
  serverType = "t3.medium";
  containerRegistry = "288487474579.ecr.aws.com/backend";
  isServerless = true;
}

class Azure implements Iaas {
  serverType = "D2.small";
  containerRegistry = "backend.acr.azure.io";
  isServerless = true;
}

class GoogleCloud implements Iaas {
  serverType = "c4-standard-2";
  containerRegistry = "gcr.io/project_id/backend";
  isServerless = true;
}

class DigitalOcean implements Paas {
  containerRegistry = "cr.do.com/backend";
  isServerless = false;
  marketApp = "Docker";
}

class Linode implements Paas {
  containerRegistry = "cr.linode.com/backend";
  isServerless = true;
  marketApp = "Docker";
}
