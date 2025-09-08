// src/pages/Contact.tsx
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <section className="bg-white text-black min-h-[90vh] px-6 md:px-12 flex items-center justify-center py-20">
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">
        
        {/* Left Container - Contact Form */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-patrick mb-6 px-4 py-2 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.15)] inline-block">
            Send a Message
          </h2>
          <form className="flex flex-col gap-4 px-6 py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,0.15)] bg-white">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="flex-1 px-4 py-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] font-patrick focus:outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="flex-1 px-4 py-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] font-patrick focus:outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] font-patrick focus:outline-none"
            />
            <textarea
              placeholder="Message"
              rows={5}
              className="px-4 py-3 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,0.1)] font-patrick resize-none focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-lg font-patrick shadow-[3px_3px_0px_rgba(0,0,0,0.15)] transition transform hover:scale-105 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.15)] mt-2"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Container - Contact Info */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-patrick mb-4 px-4 py-2 border-2 border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.15)] inline-block">
            Contact Info
          </h2>
          <div className="flex flex-col items-center gap-4 px-6 py-6 border-2 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,0.15)] bg-white font-patrick text-lg">
            {/* Placeholder Logo */}
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full mb-2 text-gray-500 font-bold">
              Logo
            </div>
            
            <p>Email: contact@keytype.com</p>
            <p>GitHub: <Link to="https://github.com/yourusername" target="_blank" className="underline">github.com/yourusername</Link></p>
            <p>LinkedIn: <Link to="https://linkedin.com/in/yourprofile" target="_blank" className="underline">linkedin.com/in/yourprofile</Link></p>
            <p>Twitter: <Link to="https://twitter.com/yourprofile" target="_blank" className="underline">@keytype</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
