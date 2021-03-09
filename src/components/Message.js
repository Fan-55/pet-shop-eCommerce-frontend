export default function Message({ children, type }) {
  return (
    <div className="message container">
      <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
        {children}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}
