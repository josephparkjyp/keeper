function Footer() {
    
    const devName = "Joseph Park"
    const thisYear = new Date().getFullYear()
    
    return (
        <footer>
            <p>{devName} Copyright ©{thisYear}</p>
        </footer>
    )
}

export default Footer