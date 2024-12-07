type CustomImageProps = {
  className?: string;
  ImageSrc: string;
  alt: string;
};

export default function CustomImage(props: CustomImageProps) {
  return (
    <>
      <img className={props.className} src={props.ImageSrc} alt={props.alt} />
    </>
  );
}
