import { CheckSquare, Shield, Users, Zap } from "lucide-react";
const features = [
  {
    icon: CheckSquare,
    title: "Smart Task Management",
    description:
      "Create, organize, and track your todos with intelligent priority levels and beautiful visual feedback.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Connect with other productive people and see who's actively working on their goals.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Experience lightning-fast synchronization across all your devices with live updates.",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your data is protected with enterprise-grade security and privacy controls.",
    color: "from-orange-500 to-red-500",
  },
];

const Features = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Stay Productive
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover powerful features designed to make task management
            effortless and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/15 hover:scale-105"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
