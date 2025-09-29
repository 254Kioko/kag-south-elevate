import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; 
import eventImage from "@/assets/upcoming-event.jpg"; // ✅ Ensure this file exists in src/assets

const Services = () => {
  const services = [
    {
      id: 1,
      badge: "Early Morning",
      badgeColor: "bg-yellow-500",
      time: "7:30 - 8:45 AM",
      name: "1st Service - Empowerment",
      description: "Start your day with intercessory prayers and empowerment service",
      schedule: [
        "Intercessory Prayers: 7:30-8:00 AM",
        "Empowerment Service: 8:00-8:45 AM"
      ],
      language: "English/Swahili",
      audience: "Youth"
    },
    {
      id: 2,
      badge: "Morning Worship",
      badgeColor: "bg-yellow-500",
      time: "9:00 - 11:00 AM",
      name: "2nd Service - Main Service",
      description: "Our main English worship service with contemporary style",
      schedule: [
        "Worship: 9:00-9:30 AM",
        "Accountability Groups: 9:30-10:00 AM",
        "Choir: 10:05-10:15 AM",
        "Message: 10:15-10:45 AM",
        "Offertory & Closing: 10:45-11:00 AM"
      ],
      language: "English",
      audience: "All Ages"
    },
    {
      id: 3,
      badge: "Main Service",
      badgeColor: "bg-yellow-500",
      time: "11:10 AM - 1:30 PM",
      name: "3rd Service - Main Service",
      description: "Our largest service combining English and Swahili worship",
      schedule: [
        "Praise & Worship: 11:10-11:40 AM",
        "Accountability Groups: 11:40 AM-12:10 PM",
        "Choir: 12:10-12:25 PM",
        "Message: 12:25-12:55 PM",
        "Offertory & Closing Prayer: 12:55-1:05 PM"
      ],
      language: "English & Swahili",
      audience: "Adults"
    },
    {
      id: 4,
      badge: "Youth Focus",
      badgeColor: "bg-yellow-500",
      time:
