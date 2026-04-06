import React from "react";

const Language = () => {
  const languages = [
    {
      name: "JavaScript",
      icon: "/Icons/languages/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "/Icons/languages/typescript-original.svg",
    },
    {
      name: "Python",
      icon: "/Icons/languages/python-original.svg",
    },
    {
      name: "Java",
      icon: "/Icons/languages/java-original.svg",
    },
    {
      name: "C++",
      icon: "/Icons/languages/cplusplus-original.svg",
    },
    {
      name: "Go",
      icon: "/Icons/languages/go-original-wordmark.svg",
    },
    {
      name: "Ruby",
      icon: "/Icons/languages/ruby-original.svg",
    },
    {
      name: "Node.js",
      icon: "/Icons/languages/nodejs-original-wordmark.svg",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto text-white">
      <div className="px-6 pb-20 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
          Multi-Language Support
        </h2>

        <p className="text-gray-400 mb-12 animate-fade-up delay-100">
          Code and collaborate in your favorite programming languages.
        </p>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center mt-32">
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              className="
        w-full h-60
        flex items-center justify-center
        rounded-2xl
        transition-all duration-300
        hover:shadow-2xl 
        animate-slide-up
      "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={lang.icon}
                alt={lang.name}
                className="
          w-32 h-32
          object-contain overflow-x-hidden
          opacity-80
          hover:opacity-100
          transition-opacity duration-300 animate-bounce-slow
        "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Language;
