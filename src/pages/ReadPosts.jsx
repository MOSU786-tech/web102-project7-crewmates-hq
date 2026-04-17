// Mentor map: Legacy summary list for Posts table entries.
// Why it exists: Preserves earlier lab read/list behavior and card rendering.
// Used by: Older post challenge flow.
import { useState, useEffect } from 'react'
import Card from '../components/Card'
import { supabase } from '../client'

const ReadPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: true })

            setPosts(data)
        }

        fetchPosts()
    }, [])
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                    <Card 
                        key={post.id}
                        id={post.id} 
                        title={post.title}
                        author={post.author}
                        description={post.description}
                        betCount={post.betCount}
                    />
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts
