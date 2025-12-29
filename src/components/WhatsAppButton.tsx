const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254724177832"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center
                 w-14 h-14 rounded-full bg-green-500 text-white
                 shadow-lg hover:bg-green-600 transition-all"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="w-7 h-7 fill-current"
      >
        <path d="M380.9 97.1C339-11.3 216.8-42.3 126.2 22.3 35.7 86.9 8.4 209.3 67.3 308.2L0 512l207.8-66.2c92.6 48.6 206.1 15.4 255.2-74.6 49.2-90 17.8-202.3-81.1-274.1zM224 438.5c-37.7 0-74.8-10.2-107.4-29.4l-7.7-4.5-61.6 19.6 20.1-60.1-5-8c-23.6-37.6-30.6-83.1-19.3-125.9C58.5 129.3 135.4 74 224 74c123.7 0 224 100.3 224 224s-100.3 224.5-224 224.5z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
