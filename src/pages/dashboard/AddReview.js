import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
// import { Rating } from "react-simple-star-rating";
import auth from "../../firebase/firebase.init";
import useUsers from "../../hooks/useUsers";
import Loading from "../../components/Loading";
import axiosPrivate from "../../API/axiosPrivate";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [user, isLoading] = useAuthState(auth);
  // const [userData, isLoading] = useUsers(user.email);
  const date = new Date();

  if (isLoading) return <Loading></Loading>;

  // const handleRating = (rate) => {
  //   setRating(rate);
  // };

  const ratingChanged = (newRating) => {
    setRating(newRating);

    // other logic
  };
  // const onPointerEnter = () => console.log("Enter");
  // const onPointerLeave = () => console.log("Leave");
  // const onPointerMove = (value, index) => console.log(value, index);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      rating,
      comment: e.target.comment.value,
      // img: userData.data.image || user?.photoURL,
      name: user?.displayName,
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };
    axiosPrivate
      .post("http://localhost:5000/api/user/review", review)
      .then((data) => {
        if (data.data.acknowledged) {
          toast.success("Your review is added");
        }
      });
    console.log("revies", review);
    e.target.reset();
  };

  return (
    <div className="card bg-base-200 shadow-xl mt-4">
      <h1 className="text-center font-semibold text-xl text-primary pt-4">
        Please leave your precious review.
      </h1>
      <form className="card-body " onSubmit={handleReviewSubmit}>
        <p className="text-black">How was your experience with our team?</p>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          isHalf={true}
          activeColor="#ffd700"
        />
        {/* <Rating
          onClick={handleRating}
          //  onPointerEnter={onPointerEnter}
          //  onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          style={{ display: "flex" }}
        /> */}

        <textarea
          name="comment"
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Your Comment"
          required
        ></textarea>
        <input
          className="btn btn-outline w-full mt-2"
          type="submit"
          value="Comment"
        />
      </form>
    </div>
  );
};

export default AddReview;
