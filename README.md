# Hyperledger Fabric get going - For Mac Developers

## Hello and welcome.

The hyperledger project and community has grown significantly since the beginning of the year.
It is made of many technologies and there is a vast amount of documentation.
If you are just starting out as a blockchain developer, then this can be as 
overwhelming as coming to London for the first time having previously lived in a
village all your life.

So, this is my attempt to get your up and running with hyperledger fabric, so that 
you can understand, write, deploy and run smart contracts.

There are many paths to doing this, but I have picked the one that requires
the least amount of steps and techical understanding.

Having said that, there are still a lot of steps. I have attempted to make these
as detailed and accurate as possible so that there is no hidden magic or assumptions
about the knowledge of the developer.

In the unlikely event that you find errors or difficulties with these instructions, please
feel free to raise an issue - comments, suggestions and insults will be accepted
with humility !

Note: There are actually two blockchains within hyperledger at the time of writing this,
namely fabric and sawtooth wave. This example is for fabric.

Note2: This example assumes you are connected to the internet - one part requires
quite a big download for the first time, so check that your kids are not in a crucial
game of COD before you hit the button.

## version warning.

This example is for a single developer working on a Mac.
Apologies to windows developers - this example should still work with small modifications
to some of the commands.

Software is changing all the time - hyperledger is under continous development -
so I have listed what you need to install and which versions I had installed
when I put this together.  

The version of hyperledger fabric is from the following location:

http://gerrit.hyperledger.org/r/fabric

The git commit version is:

24c7483a2154df5a2d915b1a3b656e914cde7501

## Prerequistites

Before you start, you will need to install the following:

The google go language  [get it here](https://golang.org)
(I used 1.5, but 1.6/1.7 should be fine)

Node [get it here](https://nodejs.org)
(I used v5.10.1, but latest should be fine)

Vagrant [get it here](https://www.vagrantup.com)
(I used 1.8.1)

Virtual Box [get it here](https://www.virtualbox.org)
(I used Version 5.0.16 r105871)

git [get it here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
(latest version will be fine)

Note: a large part of the action happens in a virtual machine inside virtual box - this
will download all the software and dependancies it needs.

## Set up your 'go' path

The go language (golang for short) requires you to have an environment
variable that points to where all your 'go' code lives. Golang is also quite fussy
about where you put your code, so it's worth following my example carefully to avoid
what I call 'gobang' where it all just goes horribly wrong.

Open a terminal and create a directory where you want to put all the code for the example.
This is what I did:  

```
cd ~/Documents/WorkStuff

mkdir gopath

cd gopath
```
(Note: 'WorkStuff' is my own directory, feel free to create your own!)

Now create the environment variable:

```
export GOPATH=$(pwd)
```

## Create a directory for the hyperledger fabric code inside your gopath

In your terminal, do the following:

```
cd $GOPATH

mkdir src/github.com/hyperledger
```

## Get the hyperledger fabric code from gerrit

In your terminal do the following:

```
cd src/github.com/hyperledger

git clone http://gerrit.hyperledger.org/r/fabric
```

Check you have a ‘fabric’ directory

```
ls -l
```

## Set up the virtual box machine

Depending on you wi-fi this can take about 30 minutes the first time you run this.
So, once you've typed the following, you can get yourself a coffee, beer or salty popcorn (or all three)

Switch to the devenv directory and bring up the virtual machine, that we use to run the fabric peer.

```
cd fabric/devenv

vagrant up 
```

Sometimes, this can fail and stop halfway. If you do get errors like this, just
run the command again - it usually sorts itself out.
Once it's finished it will come back to a terminal prompt.

## Log into the virtual machine and build the fabric code

Log into the hyper ledger virtual box

```
vagrant ssh
```

If you have logged in successfully, you should get something like this:

```
Welcome to Ubuntu 14.04.4 LTS (GNU/Linux 3.13.0-86-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Sat Sep  3 13:57:43 UTC 2016

  System load:  0.0                Processes:              96
  Usage of /:   24.2% of 38.75GB   Users logged in:        1
  Memory usage: 4%                 IP address for eth0:    10.0.2.15
  Swap usage:   0%                 IP address for docker0: 172.17.0.1

  Graph this data and manage this system at:
    https://landscape.canonical.com/

61 packages can be updated.
31 updates are security updates.

Last login: Sat Sep  3 13:57:43 2016 from 10.0.2.2
```

Now it’s time to build to code.

Go to the fabric directory on the virtual machine
(note: this is shared between the virtual machine and your Mac - have a look at the 'VagrantFile' file and you can see where this is set up)

```
cd /opt/gopath/src/github.com/hyperledger/fabric/
```


Build the code using the 'make' command:

```
make
```

Note: This also takes a while as it builds the code and runs a bunch of tests.

## Make your own copy of the chaincode

Take a copy of chain code_example02

In the terminal on the vm do the follow:

```
cd $GOPATH/src/github.com/hyperledger/fabric/examples/chaincode/go

cp -R chaincode_example02 chaincode_getgoing

cd chain code_getgoing

mv chaincode_example02.go chaincode_getgoing.go
mv chaincode_example02_test.go chaincode_getgoing_test.go
```

This takes a copy of the chaincode example, so we can fiddle around with it.

##Check that our chaincode copy builds and the tests pass

Change into our 'getgoing' directory and run the build and tests

```
cd chaincode_getgoing

go build

go test
```

## Prepare to start the hyperledger fabric services.

You will now use several terminals to run the fabric services. All of these will need
to be logged into the virtual box virtual machine (vm for short).


## Start the member service.

Open a new terminal (on mac press CMD & 'T' in the current terminal to create a new tab)

Switch to the fabric directory and log into the vm.

```
cd $GOPATH/src/github.com/hyperledger/fabric/devenv

vagrant ssh
```

Once inside the vm, go to the fabric directory and start the member services

```
cd $GOPATH/src/github.com/hyperledger/fabric/

membersrvc
```

## start a single fabric peer

As above, open another terminal, log into into the vm and switch to the fabric directory

Now start the fabric peer as follows:

```
peer node start --peer-chaincodedev --logging-level=DEBUG
```

Note: we're setting debug logging so you can see what the peer is doing.

## Run the chaincode to deploy it to the peer

As above, open another terminal, log into into the vm.

switch to our chaincode directory and start it running.

```
cd $GOPATH/src/github.com/hyperledger/fabric/examples/chaincode/go/chaincode_getgoing

CORE_CHAINCODE_ID_NAME=gg CORE_PEER_ADDRESS=0.0.0.0:7051 ./chaincode_getgoing
```

note: 'gg' is the name we will use to reference out chaincode in the command line and later the javascript example.

## Run a couple of chaincode tests on the vm

As above, open another terminal, log into into the vm and switch to the fabric directory

Run a command to register and initialise the chaincode:

```
peer chaincode deploy -n gg -c '{"function":"init", "args":["a", "100", "b", "200"]}'
```

Now lets run the 'invoke' function on the chaincode to move £10 from account 'a' to 'b'

```
peer chaincode invoke -l golang -n gg -c '{"function":"invoke","args":["a","b","10"]}’
```

We can now check b's balance using the query call:

```
peer chaincode query -l golang -n gg -c '{"function":"query","args":["b"]}'
```

Repeat the last two steps again to see if this is working - if it is, b's balance
will get bigger!

## Calling our chaincode from a java script client.

Open yet another terminal!

Switch to out dev directory and get the sample client:

```
cd $GOPATH/src/github.com/

git clone https://github.com/bartman250/hyperledgergetgoing
```

## Set up the first step javascript client

Change to the directory:

```
cd $GOPATH/src/github.com/hyperledgergetgoing/nodeclients/firststep/
```

Install the dependancies (you only need to do this once)

```
npm install
```

## Run out first step scrpt interactively

```
npm start
```

You will get a the node prompt '>' for this section

Run the deploy command

```
> deployit()
```

The result should look like this:
```
deployit()
undefined
> 200 { jsonrpc: '2.0',
  result: { status: 'OK', message: 'gg' },
  id: 1 }
```

Run the invoke command:

```
> invokeit()
```

The result should look like this:

```
invokeit()
undefined
> 200 { jsonrpc: '2.0',
  result: 
   { status: 'OK',
     message: '4fb72f6d-040d-4d1a-916e-08c41ab4266d' },
  id: 2 }
```

Now run the query

```
> queryit()
```

The result should look like this:

```
queryit()
undefined
> 200 { jsonrpc: '2.0',
  result: { status: 'OK', message: '90' },
  id: 3 }
```

Try the invoke and query again !

If you've got this far well done !!!










