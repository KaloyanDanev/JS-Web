import React from 'react';
import './CreatePost.css'
import Posts from '../Posts';

export default function CreatePost() {
    return <div className="CreatePost">
        <form>
            <textarea></textarea>
            <button>Post</button>
        </form>
        <Posts limit={3} />
    </div>;
}