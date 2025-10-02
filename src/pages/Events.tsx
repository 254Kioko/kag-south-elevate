{/* Events Grid */}
<section className="py-20">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {upcomingEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-video overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription className="text-sm">
              {event.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              {event.time}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2" />
              Expected: {event.attendees} people
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>
