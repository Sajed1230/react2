import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];



function Button({children,onClick}){
  return   <button className="button" onClick={onClick}>{children}</button>


}




export default  function App(){
 const[friends,setFriends]=useState(initialFriends)
 
  const[showAddfriend,setShowAddfriend]=useState(false)
 
const[selectedFriend,setSelectedFriend]=useState(null)


 function handleshowAddFriend(){
  setShowAddfriend((show)=> !show)
 }


 function handlAddFriend(friend){
  
  setFriends(friends =>[...friends, friend])
  }


 function handleSelection(friend){
//  setSelectedFriend(friend)

setSelectedFriend((cur)=> cur?.id === friend.id ? null : friend)

setShowAddfriend(false)

}


function handleSplitBill(value){
setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend, balance : friend.balance + value} : friend))  
setSelectedFriend(null)
}

 
 return <div className="app">
    <div className="sidebar">
      <Fruendslist friends={friends}  onSlection={handleSelection}  selectedFriend={selectedFriend} />
    
    { showAddfriend && <FriendAddFriend onAddfriend={handlAddFriend} />}
    
    <Button  onClick={handleshowAddFriend}  >{showAddfriend ?  "close"  :   "Add friend"  }</Button>
    
    </div>
    
{  selectedFriend && <FarmsplitBill selectedFriend={selectedFriend}  onSplitBill={handleSplitBill} />}

  </div>

}



function Fruendslist({friends, onSlection ,selectedFriend}){
  return <ul>
    {friends.map((friend) => (<Friend  friend={friend}  key={friend.id} selectedFriend={selectedFriend} onSlection={onSlection} />))}
  </ul>
}







function Friend({friend, onSlection ,selectedFriend}){
  
  const isSelected =selectedFriend?.id === friend.id ;
  
  
  return <li className={isSelected ?"selected" : ""}>
<img src={friend.image} alt={friend.name} />
<h3>{friend.name}</h3>
{friend.balance < 0 && <p className="red">
  you owe {friend.name} {Math.abs(friend.balance)} $

  </p>}
  {friend.balance > 0 && <p className="green">
   {friend.name}  owes you  {Math.abs(friend.balance)} $

  </p>}
  {friend.balance === 0 && <p>
  you and {friend.name} are even

  </p>}
<Button onClick={()=>onSlection(friend)} >{isSelected ? "Close"  : "Select"}</Button>

  </li>
}





function FriendAddFriend({onAddfriend}){

  const[name,setName]=useState('')
  
  const[image,setImage]=useState('https://i.pravatar.cc/48')
  
  const[balance,setBalance]=useState()
  
  function handleSubmit(e){
  

    e.preventDefault()

    if(!name || !balance) return

    const id =crypto.randomUUID()
    
    const newFriend ={

      id,

      name,

      image:`${image}?=${id}`,

      balance
    
    }

    onAddfriend(newFriend)
      setName('')
      setBalance('')
      setImage('https://i.pravatar.cc/48')


  }


  return(
    <form className="form-add-friend"  onSubmit={handleSubmit}     >
<tabel>👬 friend name</tabel>
<input type="text" value={name} onChange={(e)=> setName(e.target.value)} />


<label> 💵 money on your boket</label>
<input type="text" value={balance} onChange={(e)=> setBalance(e.target.value)}   placeholder="how Match do you have ....$" />
<Button onClick={onAddfriend}>Add</Button>

    </form>
  )

}


function FarmsplitBill({selectedFriend ,onSplitBill}){

  const[bill,setBill]=useState("")

const[paidByUser,setPaidByUser]=useState("")
const paidByFruend =  bill? bill - paidByUser:""

const[whoisPaying , setWhoisPaying]=useState("user")
  
function handleSubmit (e){
  e.preventDefault()

if(!bill || !paidByUser) return;
onSplitBill(whoisPaying === "user" ? paidByFruend : -paidByUser)


}

return (
    <form className="form-split-bill"  onSubmit={handleSubmit}  >
<h2>Split a bill with {selectedFriend.name} </h2>



<label> 💰Bill value</label>
<input type="text"  value={bill} onChange={(e)=> setBill(Number(e.target.value))}/>


<label> 🏌🏾‍♂️Your expense</label>
<input type="text" value={paidByUser} onChange={(e)=> setPaidByUser(Number(e.target.value)> bill ? paidByUser:Number(e.target.value))} />


<label> 🤾‍♂️{selectedFriend.name}`s expense</label>
<input type="text" disabled value={paidByFruend} />

<label> who is  paying the bill </label>
<select value={whoisPaying} onChange={(e)=> setWhoisPaying(e.target.value)} >
<option value="user"> You </option>
<option value="friend"> {selectedFriend.name} </option>

</select>

<Button> 💵 Split bill</Button>

    </form>
  )
}




