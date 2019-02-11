const toMonth = month => ({
  id: month.id,
  userId: month.userId,
  projectId: new Date(month.projectId),
  startsAt: new Date(month.startsAt),
  createdAt: new Date(month.createdAt),
  modifiedAt: new Date(month.modifiedAt),
  daysOfWeek: month.daysOfWeek,
  events: month.events,
})

export default {
  toMonth,
}
