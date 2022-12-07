import axios from "axios";

export const loadScript=(src)=>{
    return new Promise((resolve)=>{
        const script=document.createElement('script');

        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script)
    })
}

const bookRooms=async(selectedRooms,alldates)=>{
    await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`https://bookingo-backend.onrender.com/api/rooms/availability/${roomId}`,{
            dates: alldates,
          });
          return res.data;
        })
      );
  }

export async function displayRazorpay(data,setsuccess,selectedRooms,alldates,days){
    const options={
        key:"rzp_live_fNPtQ2cZ7xkc8k",
        currency:data.currency,
        amount:data.amount*days,
        description:"Wallet Transection",
        order_id:data.id,
        handler:function(res){
            setsuccess(1);
            bookRooms(selectedRooms)
            
        },
        prefill:{
            name:"AMAN GUPTA",
            email:"techupdate4529@gmail.com",
            contact:"9179271036"
        }
     };
     
    const paymentObject=new window.Razorpay(options)
    paymentObject.on("payment.failed",()=>{
        
        setsuccess(-1);
    })
paymentObject.open();
}

