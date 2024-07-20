const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const likes = blogs.map((x) => x.likes)
    //console.log(likes)
    const sum = likes.reduce(
        (acc, currVal) => acc + currVal, 0
    )
    return sum
}


module.exports = {
    dummy, totalLikes
}