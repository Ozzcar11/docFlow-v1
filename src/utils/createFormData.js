export default function createFormData(schema) {
  const formData = new FormData()
  for (const item of schema) {
     console.log(item)
    formData.append(item.lastModified, item)
  }
  return formData
}
