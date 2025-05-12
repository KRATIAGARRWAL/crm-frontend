import { motion } from "framer-motion";
import image from '../assets/image.png'
import {
  RocketIcon,
  UsersIcon,
  PieChartIcon,
  ShieldCheckIcon,
  ActivityIcon,
  ThumbsUpIcon,
  ChevronDownIcon,
  MenuIcon
} from "lucide-react";
import { useState } from "react";
import Login from "./Login";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const slideDown = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 150, 136, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-x-hidden">
      {/* Header */}
      
      <Navbar/>
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-teal-500 md:hidden"
        >
          <div className="flex flex-col items-center py-4 space-y-4 text-white">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#solutions" className="hover:underline">Solutions</a>
            <a href="#pricing" className="hover:underline">Pricing</a>
            <a href="#resources" className="hover:underline">Resources</a>
            <Login/>
            {/* <button className="border border-white px-4 py-1 rounded-md" onClick={}>Login</button> */}
           
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-8 px-6 py-20 bg-gradient-to-br from-white to-teal-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
        >
          <h2 className="text-4xl font-extrabold mb-4 leading-snug text-teal-800">
            Build Stronger Customer Connections, Effortlessly
          </h2>
          <p className="mb-6 text-lg text-teal-700">
            Your workday just got smarter. Empower your team with a CRM that actually feels built for the way you work.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
            >
              Get Started
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-teal-500 text-teal-700 px-6 py-2 rounded-md hover:bg-teal-100"
            >
              Request Demo
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideDown}
          className="w-full flex justify-center"
        >
          <motion.img
            src={image}
            alt="CRM Dashboard Preview"
            className="w-full max-w-md rounded-xl shadow-lg"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
            }}
          />
        </motion.div>
      </section>

      {/* Scroll Indicator */}
      <motion.div 
        className="flex justify-center pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <ChevronDownIcon size={32} className="text-teal-600" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <section id="features" className="bg-white py-20 px-6">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h3 className="text-3xl font-semibold text-teal-800">What Sets Us Apart</h3>
          <p className="text-teal-600 mt-2 max-w-xl mx-auto">
            Designed to simplify your workflow while giving you full control over customer relationships and data.
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="p-6 rounded-xl shadow-md border border-teal-100 bg-teal-50"
          >
            <RocketIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Lead Management</h4>
            <p className="text-sm text-teal-700">Automatically capture and nurture leads with insightful AI-driven workflows.</p>
          </motion.div>

          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="p-6 rounded-xl shadow-md border border-teal-100 bg-teal-50"
          >
            <UsersIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Collaboration Hub</h4>
            <p className="text-sm text-teal-700">Foster smooth communication across departments with one central space.</p>
          </motion.div>

          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="p-6 rounded-xl shadow-md border border-teal-100 bg-teal-50"
          >
            <PieChartIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Analytics & Reporting</h4>
            <p className="text-sm text-teal-700">Real-time dashboards and intuitive insights to help you stay on top of goals.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-white to-teal-100">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h3 className="text-3xl font-semibold text-teal-800">Why Teams Love CRM Pro</h3>
          <p className="text-teal-600 mt-2 max-w-xl mx-auto">
            Built with intention, driven by feedback — CRM Pro evolves with your business.
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="bg-white p-6 rounded-xl shadow-sm border border-teal-100"
          >
            <ShieldCheckIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Enterprise-grade Security</h4>
            <p className="text-sm text-teal-700">From encryption to compliance — we've got your data's back every step of the way.</p>
          </motion.div>

          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="bg-white p-6 rounded-xl shadow-sm border border-teal-100"
          >
            <ActivityIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Works With What You Use</h4>
            <p className="text-sm text-teal-700">Effortless integrations with the tools you already love using — no headaches.</p>
          </motion.div>

          <motion.div 
            variants={featureCardVariants}
            whileHover="hover"
            className="bg-white p-6 rounded-xl shadow-sm border border-teal-100"
          >
            <ThumbsUpIcon className="mx-auto mb-4 text-teal-600" size={32} />
            <h4 className="font-bold mb-2 text-teal-800">Made to Be Simple</h4>
            <p className="text-sm text-teal-700">No bloated menus. No confusing jargon. Just clean, focused productivity.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-6 bg-teal-600 text-white text-center"
      >
        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          Ready to transform your customer relationships?
        </motion.h3>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-8 max-w-xl mx-auto"
        >
          Join thousands of teams already working smarter with CRM Pro.
        </motion.p>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#0d9488" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-teal-600 px-8 py-3 rounded-md font-bold hover:bg-teal-50"
        >
          Start Your Free Trial
        </motion.button>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="bg-teal-800 text-sm text-white px-6 py-8 text-center"
      >
        <p>© {new Date().getFullYear()} CRM Pro. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <motion.a 
            href="#privacy" 
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a 
            href="#terms" 
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
          >
            Terms of Service
          </motion.a>
          <motion.a 
            href="#contact" 
            className="hover:underline"
            whileHover={{ scale: 1.1 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.footer>
    </div>
  );
}