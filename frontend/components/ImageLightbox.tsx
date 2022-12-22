import React, { Component } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css'; // This only needs to be imported once in your app
import { Gallery } from "react-grid-gallery";

const images = [
    '//placekitten.com/1500/500',
    '//placekitten.com/4000/3000',
    '//placekitten.com/800/1200',
    '//placekitten.com/1500/1500',
];

export default class ImageLightbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
        };
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        const images = [
            {
                src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                width: 320,
                height: 174,
                isSelected: true,
                caption: "After Rain (Jeshu John - designerspics.com)",
            },
            {
                src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                width: 320,
                height: 212,
                tags: [
                    { value: "Ocean", title: "Ocean" },
                    { value: "People", title: "People" },
                ],
                alt: "Boats (Jeshu John - designerspics.com)",
            },

            {
                src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                width: 320,
                height: 212,
            },
        ];

        return (
            <div>



                <Gallery images={images} defaultContainerWidth={1200}/>

{/*                <button type="button" onClick={() => this.setState({ isOpen: true })}>
                    Open Lightbox
                </button>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length,
                            })
                        }
                    />}
                )}*/}
            </div>
        );
    }
}