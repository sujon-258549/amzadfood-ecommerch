"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
export default function Newsletter() {
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("newsletterPopup"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, []);
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error.response?.data || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };

  return (
    <div
      className="modal modalCentered fade auto-popup modal-newsletter"
      id="newsletterPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content overflow-hidden rounded-2xl">
          {/* Image + Discount Badge */}
          <div className="modal-top mx-auto relative flex justify-center p-4">
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
              -25% OFF
            </span>

            <Image
              className="rounded-lg shadow-lg"
              alt="Offer"
              src="https://amzadfood.com/wp-content/uploads/2025/03/%E0%A6%9A%E0%A6%BF%E0%A6%AF%E0%A6%BE%E0%A6%BC-%E0%A6%B8%E0%A6%BF%E0%A6%A1%E0%A6%B8-%E0%A6%B9%E0%A6%BE%E0%A6%A8%E0%A6%BF-%E0%A6%95%E0%A6%AE%E0%A7%8D%E0%A6%AC%E0%A7%8B-400x400.webp"
              width={200}
              height={200}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          </div>

          {/* Content */}
          <div className="modal-bottom text-center px-6 pb-6">
            <h5 className="text-2xl font-semibold mb-1">
              🔥 Combo Special Offer!
            </h5>
            <p className="text-gray-600 mb-2">Chia Seeds + Honey Combo Pack</p>

            {/* Pricing */}
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-green-600">৳850</span>
              <span className="line-through text-gray-400 text-lg">৳1100</span>
            </div>

            {/* Order Now Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-all shadow-md mb-3">
              🛒 Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
