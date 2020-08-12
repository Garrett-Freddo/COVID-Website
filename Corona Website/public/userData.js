const app = firebase.app();
const db = firebase.firestore();
const userDB = db.collection('users');

//let myUsers = db.collection('users').doc('userInfo');
/*
let data = {
    name: "Garrett Freddo" ,
    email: "gafreddo@gmail.com"
};
*/
//let res = myUsers.set(data);

function addDataToFirestore(fname, lname, email){
    let code = Math.floor((Math.random() * 100000) + 1).toString();
    let data = {
        Fname: fname,
        Lname: lname,
        Email: email,
        verified: false,
        Code: code
    };
    let res = db.collection('users').doc(fname + lname).set(data);

    return code;
}





 function  searchByNameThenEmail(fname, lname){
    let name = fname+lname;
    let user;
    let found = false;
    user =  userDB.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.id === name){
                sendEmail(doc.data().Email);
                found = true;
            }
        })
        if(!found){
            alert("not found");
        }
     })
}

function  searchByNameThenVerificationEmail(fname, lname){
    let name = fname+lname;
    let user;
    let found = false;
    user =  userDB.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.id === name){
                sendVerificationEmail(doc.data().Email, doc.data().Code);
                found = true;
            }
        })
        if(!found){
            alert("No users found, try pressing submit");
        }
     })
}

function verifyCode(fname, lname, code){
    let name = fname+lname;
    let user;
    let found = false;
    user =  userDB.get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if(doc.id === name){
                //This is where we verify
                if(doc.data().Code === code){
                    console.log("in the statement");
                    let data = {
                        Fname: doc.data().Fname,
                        Lname: doc.data().Lname,
                        Email: doc.data().Email,
                        verified: true,
                        Code: code

                    }
                    let res = db.collection('users').doc(fname + lname).set(data);

                }
                found = true;
            }
        })
        if(!found){
            alert("No users found");
        }
     })

}







function sendVerificationEmail(address, code){
    if(code !== "Registration error")
    {
    Email.send({
        //Host : "smtp.yourisp.com",
        SecureToken: "780a9a99-a125-45dd-98d8-9686b5639c22", 
        To : address,
        From : "covidcontacttracer1@gmail.com",
        Subject : "This is the subject",
        Body : code
    }).then(
      message => alert("Verification email sent")
    );
    }
}


function sendEmail(address){
    Email.send({
        //Host : "smtp.yourisp.com",
        SecureToken: "780a9a99-a125-45dd-98d8-9686b5639c22", 
        To : address,
        From : "covidcontacttracer1@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}

function getInputValVcodeFname(){
    let inputValVcodeFname = document.getElementById("VcodeFname").value;        
    return inputValVcodeFname.toLowerCase();
}

function getInputValVcodeLname(){
    let InputValVcodeLname = document.getElementById("VcodeLname").value;
    return InputValVcodeLname.toLowerCase();
}

function getInputValVcode(){
    let InputValVcode = document.getElementById("Vcode").value;
    return InputValVcode.toString();
}


function getInputValfName(){
    let inputValfName = document.getElementById("fname").value;
    return inputValfName.toLowerCase();
}

function getInputValLName(){
    let inputValLname = document.getElementById("lname").value;
    return inputValLname.toLowerCase();
}
function getInputValemail(){
    let inputValemail = document.getElementById("email").value;
    return inputValemail;
}
function getContactValfName(){
    let contactValfName = document.getElementById("fnameContact").value;
    return contactValfName.toLowerCase();
}
function getContactValLName(){
    let contactValLname = document.getElementById("lnameContact").value;
    return contactValLname.toLowerCase();
}


function printName(){
console.log(getInputValfName(), getInputValLName(),getInputValemail());
}


class LinkedListNode {
    constructor(first, last, email) {
        this.first = first;
        this.last = last;
        this.email = email;
        this.next = null;
        this.code = Math.floor((Math.random() * 100) + 1).toString();
        this.verified = false;
    }
}


const head = Symbol("head");
class LinkedList {
    constructor(){
        this[head] = new LinkedListNode("garrett", "freddo", "gafreddo@gmail.com");
    }

    isCodeValid(first, last, email, codeEntered){
        let current = this[head];
        let found = false;
        while(current.next!==null || !found){
            if(current.first === firstName && current.last === lastName &&current.email ===email){
                found  = true;
                break;
            }
            current = current.next;
        }
        if(current.first === firstName && current.last === lastName && current.email === email){
            found = true;
        }
        if(found){
            if(current.code === codeEntered){
                current.verified = true;
            }
        }
    }

    searchForCode(fname, lname, email){
        let current = this[head];
        while(current.next != null){
            console.log(fname, lname, email);
            if(current.first === fname && current.last === lname & current.email === email){
                return current.code;
            }
            current = current.next;
        }
        if(current.first === fname && current.last === lname && current.email === email){
            return current.code;
        }
        alert("No Users found, try pressing submit first");
        return "Registration error";
    }

    setCode(){
        this.code = Math.floor((Math.random() * 100) + 1).toString();
    }

    add(first, last, email){
        const newNode = new LinkedListNode(first,last, email);
        let current = this[head];
        while(current.next !== null){
            current = current.next;
        }
        current.next = newNode;
    }


    printNode(){
        let current = this[head];
        while(current.next!==null){
            console.log(current.first, current.last, current.email, current.code);
            current = current.next;
        }
        console.log(current.first, current.last, current.email);
    }


    search(firstName, lastName){
        let current = this[head];
        let found = false;
        while(current.next!==null){
            if(current.first === firstName && current.last === lastName){
                found  = true;
                sendEmail(current.email, current.code);
                alert("Contact received an email");
            }
            current = current.next;
        }
        if(current.first === firstName && current.last === lastName){
            found = true;
            sendEmail(current.email);
            alert("Contact received an email");
        }

        if(!found){
            alert("No contacts found");
        }

    }



}
const dataBase = new LinkedList();

function addToList(){
    if(getInputValemail()!== "" && getInputValLName()!== "" && getInputValfName() !== "" ){
    dataBase.add(getInputValfName(), getInputValLName(), getInputValemail());
  //  console.log(getInputValfName(), "fname");
    }
    else{
        alert("please make sure all text fields are filled");
    }
    dataBase.printNode();
}

function searchForName(){
    if(getContactValfName()!== "" && getContactValLName()!==""){
    dataBase.search(getContactValfName(), getContactValLName());
    }
    else{
        alert("please make sure all contact fields are filled");
    }
}

function findCode(fname, lname, email){
    return(dataBase.searchForCode(fname, lname, email));
}