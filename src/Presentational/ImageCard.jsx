import React from 'react';

import converter from './dateConverter';

const ImageCard = props => (
  <div className="container">
    <h4 className="text-dark font-weight-normal text-uppercase">
      {props.heading}
    </h4>
    <div className="row p-2">
      <div className="card-columns">
        {props.data.map((data, index) => (
          <React.Fragment key={index}>
            <div className="card">
              <img className="card-img-top" src={data.image} alt={data.title} />
              <div className="card-body">
                <h5 className="card-title my-0">{data.title}</h5>
                <p className="card-text text-muted">{converter(data.time)}</p>
                <p className="card-text text-justify">{data.description}</p>
                <a
                  className="btn btn-sm btn-primary"
                  href={data.link}
                  target="_blank"
                >
                  {data.linktitle}
                </a>
              </div>
            </div>
            {(index + 1) % props.number === 0 ? (
              <div className="w-100" />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default ImageCard;
