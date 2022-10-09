import { Carousel, Modal } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import { useRef, useState } from "react";
import { Story } from "../schema/Story";

const StoriesWidget = ({ stories, modalOpen, onClose }: any) => {
  const ref = useRef<any>();
  const [currentMediaDuartion, setCurrentMediaDuartion] = useState(5000);
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Modal
      maskClosable={true}
      closable={false}
      centered
      width={700}
      open={modalOpen}
      footer={null}
      onCancel={onClose}
      destroyOnClose={true}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        {
          <Carousel
            autoplay
            dots={false}
            ref={ref}
            autoplaySpeed={currentMediaDuartion}
            beforeChange={(from, to) => {
              const currentStory = stories[to];
              if (currentStory?.mediaType === "image") {
                setCurrentMediaDuartion(5000);
              }
              setCurrentSlide(to);
            }}
          >
            {stories.map((story: Story, index: number) => (
              <div
                key={index}
                style={{
                  position: "relative",
                }}
              >
                {story.mediaType === "image" ? (
                  <img
                    src={story.media}
                    alt=""
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      margin: "auto",
                    }}
                  />
                ) : currentSlide === index ? (
                  <video
                    src={story.media}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      margin: "auto",
                    }}
                    autoPlay
                    onLoadedMetadata={(e) => {
                      setCurrentMediaDuartion(e.currentTarget.duration * 1000);
                    }}
                  />
                ) : (
                  ""
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {story.caption}
                </div>
              </div>
            ))}
          </Carousel>
        }
        {currentSlide !== 0 && (
          <LeftCircleFilled
            style={{
              position: "absolute",
              top: "50%",
              left: "5px",
              fontSize: "2rem",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => ref?.current?.prev()}
          />
        )}
        {currentSlide !== stories.length - 1 && (
          <RightCircleFilled
            style={{
              position: "absolute",
              top: "50%",
              right: "5px",
              fontSize: "2rem",
              color: "#fff",
              cursor: "pointer",
            }}
            onClick={() => ref?.current?.next()}
          />
        )}
      </div>
    </Modal>
  );
};

export default StoriesWidget;
