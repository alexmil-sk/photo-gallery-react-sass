import React, {useState} from 'react';

function CollectionComp({name, images}) {
  
  const [bigImg, setBigImg] = useState(images[0]);
  const smallImgArray = images.slice(1);
  
  function getImgBig(val) {
    let findImg = smallImgArray.find((_, idx) => idx === val);
    setBigImg(findImg)
  }
  
  return (
    <div className="collection">
      <img className="collection__big" src={bigImg} alt="Item"/>
      <div className="collection__bottom">
        {
          smallImgArray.map((img, idx) => (
              <img
                key={img}
                className="collection__img"
                src={img}
                alt={idx}
                onClick={() => getImgBig(idx)}
              />
          ))
        }
      </div>
      <h4>{name}</h4>
    </div>
  );
}

export default CollectionComp;
