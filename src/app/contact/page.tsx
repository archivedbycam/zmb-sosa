import NavHeader from "@/components/nav-header"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavHeader />
      
      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-black mb-4">Contact</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for collaborations, inquiries, or just to say hello.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-black mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-black mb-6">Get in touch</h2>
              <p className="text-gray-600 mb-8">
                We'd love to hear from you. Whether you have a question about our projects, 
                want to collaborate, or just want to say hi, we're here to help.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-medium text-black">Email</h3>
                  <p className="text-gray-600">hello@zmbsosa.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-medium text-black">Location</h3>
                  <p className="text-gray-600">Based in New York, NY</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-black rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-medium text-black">Response Time</h3>
                  <p className="text-gray-600">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-medium text-black mb-4">Follow us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 