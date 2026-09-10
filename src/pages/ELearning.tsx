import { Layout } from "@/components/Layout";
import { SectionWrapper, SectionHeader } from "@/components/SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Video, Users, Award, Clock, Star, ArrowRight, Play, Monitor, GraduationCap,
} from "lucide-react";

const courses = [
  { title: "Full-Stack Web Development", category: "Technology", duration: "12 weeks", students: 2400, rating: 4.8, image: "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Intermediate" },
  { title: "Digital Marketing Mastery", category: "Marketing", duration: "8 weeks", students: 1800, rating: 4.7, image: "https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Beginner" },
  { title: "Healthcare Management", category: "Healthcare", duration: "10 weeks", students: 950, rating: 4.9, image: "https://images.pexels.com/photos/5407260/pexels-photo-5407260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Advanced" },
  { title: "Hospitality Operations", category: "Hospitality", duration: "6 weeks", students: 720, rating: 4.6, image: "https://images.pexels.com/photos/6466490/pexels-photo-6466490.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Beginner" },
  { title: "AI & Machine Learning", category: "Technology", duration: "16 weeks", students: 3200, rating: 4.9, image: "https://images.pexels.com/photos/8124399/pexels-photo-8124399.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Advanced" },
  { title: "Business Process Management", category: "Business", duration: "8 weeks", students: 1100, rating: 4.5, image: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&h=650&w=940", level: "Intermediate" },
];

const liveClasses = [
  { title: "Intro to React & TypeScript", instructor: "Rahul Sharma", time: "Today, 3:00 PM IST", viewers: 156 },
  { title: "SEO Best Practices 2025", instructor: "Priya Patel", time: "Tomorrow, 11:00 AM IST", viewers: 89 },
  { title: "Hospital Accreditation Guide", instructor: "Dr. Meera Joshi", time: "Wed, 2:00 PM IST", viewers: 234 },
];

const testimonials = [
  { name: "Ankit Verma", role: "Software Developer", text: "The Full-Stack course transformed my career. Landed a 60% salary hike within 3 months.", rating: 5 },
  { name: "Sneha Reddy", role: "Marketing Manager", text: "Best digital marketing course I've taken. Practical, hands-on, and industry-relevant.", rating: 5 },
  { name: "Dr. Kavita Singh", role: "Hospital Administrator", text: "Healthcare management modules are top-notch. Helped streamline our operations significantly.", rating: 5 },
];

const heroImage = "https://images.pexels.com/photos/28927920/pexels-photo-28927920.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";
const testimonialImage = "https://images.pexels.com/photos/8055848/pexels-photo-8055848.jpeg?auto=compress&cs=tinysrgb&h=650&w=940";

const ELearning = () => (
  <Layout>
    <div className="pt-24">
      {/* Hero */}
      <SectionWrapper>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium mb-6">
              <GraduationCap className="w-4 h-4 inline mr-2" />E-Learning Platform
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              Learn. Grow. <span className="text-gradient-gold">Transform.</span>
            </h1>
            <p className="text-lg text-muted-foreground font-body mb-8 max-w-2xl mx-auto">
              Industry-expert courses across Technology, Healthcare, Hospitality, and Business — with live classes and certifications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Explore Courses <ArrowRight className="w-5 h-5" /></Link>
              </Button>
              <Button variant="outline" size="xl">
                <Play className="w-5 h-5" /> Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mt-12 rounded-3xl overflow-hidden border border-border shadow-elevated group"
          >
            <img
              src={heroImage}
              alt="Student learning online"
              loading="lazy"
              className="w-full h-[260px] md:h-[360px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: BookOpen, label: "50+ Courses", value: "50+" },
              { icon: Users, label: "10K+ Students", value: "10K+" },
              { icon: Video, label: "500+ Hours", value: "500+" },
              { icon: Award, label: "Certifications", value: "20+" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center p-4 rounded-xl bg-secondary/30">
                <s.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-sm text-muted-foreground font-body">{s.label.split(" ").slice(1).join(" ")}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Courses */}
      <SectionWrapper>
        <SectionHeader badge="Courses" title="Browse Our Courses" subtitle="Expertly crafted curriculum for every skill level." />
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-8 bg-secondary/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Technology">Tech</TabsTrigger>
            <TabsTrigger value="Healthcare">Health</TabsTrigger>
            <TabsTrigger value="Business">Business</TabsTrigger>
          </TabsList>
          {["all", "Technology", "Healthcare", "Business"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => tab === "all" || c.category === tab).map((course, i) => (
                  <motion.div key={course.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Card className="bg-gradient-card border-border/30 hover:border-primary/30 group h-full transition-all hover:-translate-y-1 overflow-hidden">
                      <div className="relative h-36 overflow-hidden">
                        <img src={course.image} alt={course.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        <span className="absolute top-3 left-3 text-xs font-body font-medium text-primary bg-primary/10 px-2 py-1 rounded-full backdrop-blur-sm border border-primary/20">{course.category}</span>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-display font-semibold text-foreground mt-1 mb-2">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground font-body mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            <span className="text-sm font-body text-foreground">{course.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-body bg-secondary/50 px-2 py-1 rounded">{course.level}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </SectionWrapper>

      {/* Live Classes */}
      <SectionWrapper>
        <SectionHeader badge="Live Classes" title="Upcoming Live Sessions" subtitle="Join real-time interactive sessions with industry experts." />
        <div className="grid md:grid-cols-3 gap-6">
          {liveClasses.map((cls, i) => (
            <motion.div key={cls.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-gradient-card border-border/30 hover:border-primary/30 group transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs text-red-400 font-body font-medium">LIVE</span>
                    <span className="text-xs text-muted-foreground font-body ml-auto"><Monitor className="w-3 h-3 inline mr-1" />{cls.viewers} watching</span>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">{cls.title}</h3>
                  <p className="text-sm text-muted-foreground font-body mb-1">{cls.instructor}</p>
                  <p className="text-xs text-primary font-body">{cls.time}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">Join Session</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper>
        <SectionHeader badge="Student Reviews" title="What Our Students Say" subtitle="Real success stories from our learners." />
        {/* Student image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-10 rounded-3xl overflow-hidden border border-border shadow-elevated group"
        >
          <img
            src={testimonialImage}
            alt="Student learning online"
            loading="lazy"
            className="w-full h-[200px] md:h-[280px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-gradient-card border-border/30 h-full">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">{Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 text-primary fill-primary" />)}</div>
                  <p className="text-sm text-muted-foreground font-body mb-4 italic">"{t.text}"</p>
                  <div>
                    <p className="text-foreground font-display font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground font-body">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper>
        <div className="text-center bg-gradient-card rounded-2xl border border-primary/20 p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto">Join thousands of students building career-defining skills with Our Thoughts LSKJ.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="xl" asChild><Link to="/contact">Get Started <ArrowRight className="w-5 h-5" /></Link></Button>
            <Button variant="outline" size="xl" asChild><Link to="/contact">Request Demo</Link></Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  </Layout>
);

export default ELearning;
