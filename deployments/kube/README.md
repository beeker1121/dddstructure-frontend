# Deploy App in Kubernetes

This will explain how to deploy the frontend application inside of a Kubernetes cluster. For test purposes, we will use `minikube` to create a local Kubernetes cluster. Eventually this can be ported to GKE for a production ready deployment.

## Minikube

This requires that you have Docker, minikube, and kubectl installed. You can follow the guide in the dddstructure API repo `../deployment/README.md` file to see how to install these applications on a Debian VM.

### Build the Docker image

1. Clone the `dddstructure-frontend` repository to your VM and make it your working directory:

`git clone git@github.com:beeker1121/dddstructure-frontend.git`
`cd dddstructure-frontend`

OR

Upload to the VM using FTP.

2. Set our local Docker commands to use the `minikube` Docker daemon:

`eval $(minikube docker-env)`

This command will set up our environment variables to point to the `minikube` Docker daemon.

3. Verify we are using the `minikube` Docker daemon:

`docker images`

Which should show something like:

```sh
REPOSITORY                                TAG        IMAGE ID       CREATED         SIZE
dddstructure                              latest     01015c98d06a   19 hours ago    109MB
dddstructure                              v1.0.0     01015c98d06a   19 hours ago    109MB
mysql                                     8.0        00a697b8380c   3 weeks ago     772MB
curlimages/curl                           latest     e507f3e43db3   4 weeks ago     21.9MB
registry.k8s.io/kube-apiserver            v1.32.0    c2e17b8d0f4a   4 months ago    97MB
registry.k8s.io/kube-scheduler            v1.32.0    a389e107f4ff   4 months ago    69.6MB
registry.k8s.io/kube-controller-manager   v1.32.0    8cab3d2a8bd0   4 months ago    89.7MB
registry.k8s.io/kube-proxy                v1.32.0    040f9f8aac8c   4 months ago    94MB
registry.k8s.io/etcd                      3.5.16-0   a9e7e6b294ba   7 months ago    150MB
registry.k8s.io/coredns/coredns           v1.11.3    c69fa2e9cbf5   9 months ago    61.8MB
registry.k8s.io/pause                     3.10       873ed7510279   11 months ago   736kB
mysql                                     5.7        5107333e08a8   17 months ago   501MB
gcr.io/k8s-minikube/storage-provisioner   v5         6e38f40d628d   4 years ago     31.5MB
```

4. Build the Docker image - make sure you're in the root `dddstructure-frontend` application directory:

`docker build -t dddstructure-frontend:v1.0.0 -f deployments/kube/Dockerfile .`
`docker tag dddstructure-frontend:v1.0.0 dddstructure-frontend:latest`

5. Check that image is now available to the `minikube` Docker daemon:

`docker images`

Which should now show:

```sh
REPOSITORY                                TAG        IMAGE ID       CREATED          SIZE
dddstructure-frontend                     latest     b4a62dee4aa7   39 seconds ago   928MB
dddstructure-frontend                     v1.0.0     b4a62dee4aa7   39 seconds ago   928MB
dddstructure                              latest     01015c98d06a   19 hours ago     109MB
dddstructure                              v1.0.0     01015c98d06a   19 hours ago     109MB
mysql                                     8.0        00a697b8380c   3 weeks ago      772MB
curlimages/curl                           latest     e507f3e43db3   4 weeks ago      21.9MB
registry.k8s.io/kube-apiserver            v1.32.0    c2e17b8d0f4a   4 months ago     97MB
registry.k8s.io/kube-scheduler            v1.32.0    a389e107f4ff   4 months ago     69.6MB
registry.k8s.io/kube-controller-manager   v1.32.0    8cab3d2a8bd0   4 months ago     89.7MB
registry.k8s.io/kube-proxy                v1.32.0    040f9f8aac8c   4 months ago     94MB
registry.k8s.io/etcd                      3.5.16-0   a9e7e6b294ba   7 months ago     150MB
registry.k8s.io/coredns/coredns           v1.11.3    c69fa2e9cbf5   9 months ago     61.8MB
registry.k8s.io/pause                     3.10       873ed7510279   11 months ago    736kB
mysql                                     5.7        5107333e08a8   17 months ago    501MB
gcr.io/k8s-minikube/storage-provisioner   v5         6e38f40d628d   4 years ago      31.5MB
```

Notice we have the `dddstructure-frontend` image now present.

#### ConfigMap

Next, we'll apply the ConfigMap to the cluster. This is meant for non-sensitive variables such as the database host and port. Our API and MySQL deployments will be able to pull the variables set in the ConfigMap via environment variables.

Browse to the `deployments/kube` directory:

`cd deployments/kube`

Apply the ConfigMap:

`kubectl apply -f dddstructure-frontend-configmap.yaml`

Which should show:

```sh
configmap/dddstructure-frontend-configmap created
```

You should now be able to view the ConfigMap via `kubectl`:

`kubectl get configmaps`

And it should display:

```sh
NAME                              DATA   AGE
dddstructure-configmap            2      19h
dddstructure-frontend-configmap   2      19s
kube-root-ca.crt                  1      19h
```

##### Frontend application Deployment

1. Apply the frontend Deployment located in the `deployments/kube` directory:

`kubectl apply -f dddstructure-frontend-deployment.yaml`

Which should show:

```sh
deployment.apps/dddstructure-frontend-deployment created
```

View deployments:

`kubectl get deployments`

Which should show:

```sh
NAME                               READY   UP-TO-DATE   AVAILABLE   AGE
dddstructure-api-deployment        1/1     1            1           19h
dddstructure-frontend-deployment   1/1     1            1           94s
dddstructure-mysql-deployment      1/1     1            1           19h
```

Notice we have the other backend Deployments running from the `dddstructure` backend API application.

Desribe the frontend deployment:

`kubectl describe deployment dddstructure-frontend-deployment`

Get the pods:

`kubectl get pods -l app=dddstructure-frontend`

Which should show a result like this:

```sh
NAME                                               READY   STATUS    RESTARTS   AGE
dddstructure-frontend-deployment-6ffc95d8d-tz84s   1/1     Running   0          3m57s
```

2. Let's test a `curl` command:

Get the IP address of the Pod:

`kubectl get pods -o wide`

Which will display:

```sh
NAME                                               READY   STATUS    RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
dddstructure-api-deployment-5869cbf996-fx2s9       1/1     Running   0          19h     10.244.0.7    minikube   <none>           <none>
dddstructure-frontend-deployment-6ffc95d8d-tz84s   1/1     Running   0          4m29s   10.244.0.10   minikube   <none>           <none>
dddstructure-mysql-deployment-848b8cdfb5-l6l7f     1/1     Running   0          20h     10.244.0.3    minikube   <none>           <none>
```

We can see the internal IP of our frontend Deployment Pod in the cluster is `10.244.0.10` - this is the IP we'll use to issue a `curl` command.

Spin up a new Pod within the cluster that has `curl` installed, and when we exit, the shell will be removed:

`kubectl run -it --rm --image=curlimages/curl curly -- /bin/sh`

Get the IP address of the Pod

Run the signup example request:

```sh
curl -X GET http://10.244.0.10:5173/
```

Notice we're using the `10.244.0.10` IP, and the port the container is listening on of `5173`.

If we set up everything correctly, we should get back a successful response with a JWT:

```sh
~ $ curl -X GET http://10.244.0.10:5173/
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
    <script type="module" crossorigin src="/assets/index-CQ20OAIf.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DvfbhlDQ.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```