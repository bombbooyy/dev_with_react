import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = (props) => (
		<div>
			<div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/${ props.auth.user.id }`}>
              <img className="rounded-circle d-none d-md-block" 
              		 src={ props.auth.user.avatar }
                   alt="" />
            </Link>
            <br />
            <p className="text-center">{ props.auth.user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{ props.post.post.text }</p>
          </div>
        </div>
      </div>
		</div>
)

export default PostItem;
