import React from 'react'
import { useParams } from "react-router-dom";

function Showspell() {

    // const [slug] = useState(useParams().slug);

  return (
    <div>
        <div className='spells_discription text-white my-5 pl-3'>
            <div className='text-center pb-4'>
            <img src="https://cdn.imgbin.com/8/19/23/imgbin-dofus-magic-word-spell-massively-multiplayer-online-role-playing-game-others-PfHFPa6errJHWWtJKYtYVRrfj.jpg" alt="" className='border_spells ml-2' width={'80px'}/>
            </div>
            <p>Heads or Tails</p>
        </div>
    </div>
  )
}

export default Showspell