const toMonth = month => ({
  id: month.id,
  userId: month.userId,
  projectId: new Date(month.projectId),
  startsAt: new Date(month.startsAt),
  days: month.days,
  createdAt: new Date(month.createdAt),
  modifiedAt: new Date(month.modifiedAt),
})

export default {
  toMonth,
}
