import React, {useState, useEffact} from 'react';
import ReviewEntry from './ReviewEntry.jsx';


const ReviewsList = (props) => {
  if (!props.reviews.length) {
    return (<button className="btn new-revs">ADD A REVIEW +</button>);
  } else {
    const [reviews, setReviews] = useState({
      origin:props.reviews,
      copy: props.reviews.slice(),
      renderList: []
    });

    if (reviews.origin !== props.reviews) {
      console.log('different reviews!');
      setReviews({
        origin: props.reviews,
        copy:props.reviews.slice(),
        renderList:[]
      })
    }
    const [isEnd, setIsEnd] = useState(false);
    const [select, setSelect] = useState("relevance");
    const [id, setId] = useState(props.id);
    //console.log('id: ', props.id, id);
    if (id !== props.id) {
      console.log('different product');
      setSelect("relevance");
      setId(props.id);
    }
    // console.log('props reviews:', props.reviews);
    // console.log('reviewslist review2: ', reviews.copy);
    !reviews.renderList.length ? setReviews({...reviews, renderList: reviews.copy.splice(0, 2)}) : reviews.renderList

    return (
      <div className="revs-right">
        <div className="rev-sum">{props.reviews.length} reviews, sorted by
        <select value={select} onChange={(e) => {
          setSelect(e.target.value);
          props.getReviews(e.target.value);
          }}>
          <option value="relevance">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
        </div>
        <ul className="revs-list">
          {reviews.renderList.map(review => <ReviewEntry review={review} key={review.review_id} />)}
        </ul>
        <div className="revs-footer">
          {isEnd ? null : <button onClick={() => {
            if (reviews.copy.length >= 2) {
              let add = reviews.copy.splice(0, 2)
              setReviews({...reviews, renderList: reviews.renderList.concat(add)});
            } else if (reviews.copy.length === 1) {
              setReviews({...reviews, renderList: reviews.renderList.concat(reviews.copy)});
            } else if (!reviews.copy.length) {
              setIsEnd(true);
            }
          }} className="btn more-revs">MORE REVIEWS</button>}
          <button className="btn new-revs">ADD A REVIEW +</button>
        </div>
      </div>
    )
  }
}

export default ReviewsList;