import Navbar from "../components/Navbar";
const Contact = () => {
  function sendEmail(e) {
    e.preventDefault();    
      alert('Email sent successfully');
  }
  return (
    <>
    <Navbar/>
    <div className='flex items-center justify-center w-[100%] h-[100%]'>
     <div className="w-[100%] h-[100%] text-white ">
    <div className="pt-10 md:pt-20">
        <div className="p-4 md:p-8">
            <h1 className="pb-8 text-4xl font-light text-center text-white md:text-5xl lg:text-6xl">Contact Me</h1>
            <form className="flex flex-col items-center" onSubmit={sendEmail}>
                <div className="md:w-3/4 lg:w-2/3 xl:w-1/2">
                    <div className="flex flex-col md:flex-row">
                        <input id="name" type="text"
                            className="w-full px-4 py-2 my-2 text-gray-300 bg-gray-900 rounded-md outline-none md:w-1/2 md:mr-2 focus:ring-2 focus:ring-blue-600"
                            placeholder="Name"/>
                        <input id="email" type="email"
                            className="w-full px-4 py-2 my-2 text-gray-300 bg-gray-900 rounded-md outline-none md:w-1/2 md:ml-2 focus:ring-2 focus:ring-blue-600"
                            placeholder="Email"/>
                    </div>
                    <input id="subject" type="text" placeholder="Subject"
                        className="w-full px-4 py-2 my-2 text-gray-300 bg-gray-900 rounded-md outline-none focus:ring-2 focus:ring-blue-600"/>
                    <textarea id="message" rows="5" placeholder="Say Something"
                        className="w-full px-4 py-2 my-2 text-gray-300 bg-gray-900 rounded-md outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                </div>
                <button
                    className="px-4 py-2 mt-5 text-gray-100 transition duration-300 ease-in-out bg-blue-600 border-2 rounded-md text-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" type='submit'>
                    Send Message
                </button>
            </form>
        </div>
    </div>
</div>
    </div>
    </>
  )
}

export default Contact

