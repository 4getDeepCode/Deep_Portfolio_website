import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticlesBackground from "../component/ParticlesBackground";
import Astra from "../assets/deep1.png";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "service", "idea"];
    const newErrors = {};
    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field"),
    );
    if (formData.service && !formData.budget.trim())
      newErrors.budget = "Fill this field";
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({ name: "", email: "", service: "", budget: "", idea: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen bg-black overflow-x-hidden text-white flex items-center justify-center"
    >
      <ParticlesBackground />

      {/* TOP CENTER HEADING */}
      <h2
        className="
        top-8 sm:top-2
        text-2xl sm:text-5xl font-semibold
          absolute left-1/2 -translate-x-1/2
          text-4xl font-semibold tracking-wide
          bg-clip-text text-transparent
          bg-gradient-to-r from-yellow-400 via-white to-gray-400
          z-20
        "
      >
        Contact Us
      </h2>

      <div
        className="relative z-10 w-full max-w-6xl pt-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center place-items-center md:place-items-stretch
    mb-10 mb-10"
      >
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className=" relative rounded-2xl p-5 sm:p-8 w-full max-w-md sm:max-w-lg mx-auto bg-white/5 backdrop-blur-xl
                       border border-white/10 shadow-[0_0_30px_rgba(250,204,21,0.15)] "
        >
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-yellow-400 to-orange-400" />

          <h3
            className="
              text-3xl font-semibold mb-6 text-center md:text-left
              bg-clip-text text-transparent
              bg-gradient-to-r from-yellow-400 via-white to-gray-400
            "
          >
            Let’s Work Together
          </h3>

          <form onSubmit={handleSubmit} className="grid gap-4 ">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.name ? "border-red-500" : "border-white/20"
              } focus:outline-none`}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/20"
              } focus:outline-none`}
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.service ? "border-red-500" : "border-white/20"
              } focus:outline-none`}
            >
              <option value="" disabled>
                Service Needed *
              </option>
              <option value="Web Development" className="text-black">
                Web Development
              </option>
              <option value="Other" className="text-black">
                Other
              </option>
            </select>

            <input
              type="text"
              name="budget"
              placeholder="Budget *"
              value={formData.budget}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.budget ? "border-red-500" : "border-white/20"
              } focus:outline-none`}
            />

            <textarea
              rows={4}
              name="idea"
              placeholder="Tell me about your idea *"
              value={formData.idea}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${
                errors.idea ? "border-red-500" : "border-white/20"
              } focus:outline-none resize-none`}
            />

            {status && (
              <p
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                    ? "Message sent successfully ✅"
                    : "Something went wrong ❌"}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
              className="
                mt-2 py-3 rounded-md font-semibold
                bg-yellow-400 text-black
                hover:bg-yellow-300 transition
              "
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className=" justify-end hidden lg:flex"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-[400px] max-h-[100vh] object-contain"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
