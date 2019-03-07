const toEvent = event => ({
  ...event,
  start: event.start && new Date(event.start),
  end: event.end && new Date(event.end),
  createdAt: new Date(event.createdAt),
})
const toMonth = month => ({
  id: month.id,
  userId: month.userId,
  projectId: new Date(month.projectId),
  startsAt: new Date(month.startsAt),
  createdAt: new Date(month.createdAt),
  modifiedAt: new Date(month.modifiedAt),
  daysOfWeek: month.daysOfWeek,
  events: month.events && month.events.map(e => toEvent(e)),
})

export default {
  toMonth,
}
