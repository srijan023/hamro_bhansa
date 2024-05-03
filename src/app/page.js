import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeaders";
import {
  FaFacebook,
  FaSquareInstagram,
  FaSquareTwitter,
} from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about">
        <SectionHeader
          leftImage={"/logo.png"}
          scaleleft={"scale-150"}
          lefttop={"top-14"}
          scaleright={"scale-100"}
          righttop={"top-14"}
          rightImage={"/written.png"}
          heading={"About Us"}
          subheading={"Our Story"}
        />
        <div className="text-gray-500 text-center max-w-4xl mx-auto flex-col flex gap-6">
          <p>
            Welcome to our vibrant platform, where we bring the authentic
            flavors of Nepal right to your doorstep. At Hamro Bhansa, we are
            passionate about sharing the rich culinary heritage of Nepal with
            the world. Our journey began with a simple yet powerful vision: to
            make the distinctive tastes and aromas of Nepali cuisine accessible
            to food enthusiasts everywhere. With a commitment to quality,
            authenticity, and convenience, we strive to create a seamless
            experience for our customers, whether they&apos;re craving momo
            dumplings, spicy aloo tama, or fragrant dal bhat.
          </p>
          <p>
            We take immense pride in our curated selection of traditional Nepali
            ingredients and dishes, sourced directly from local producers and
            skilled artisans across Nepal. Every product on our platform
            undergoes rigorous quality checks to ensure that it meets our
            stringent standards for freshness, purity, and authenticity. From
            the bustling streets of Kathmandu to the tranquil villages of the
            Himalayas, we traverse the length and breadth of Nepal to bring you
            the finest spices, herbs, grains, and condiments that form the
            backbone of Nepali cuisine.
          </p>
          <p>
            At Hamro Bhansa, we are more than just an e-commerce platform – we
            are a community of food lovers, culinary explorers, and cultural
            enthusiasts united by a shared love for Nepali gastronomy. Whether
            you&apos;re a seasoned chef looking to recreate authentic Nepali
            recipes or a curious foodie eager to embark on a culinary adventure,
            we invite you to join us on this flavorful journey. Explore our
            diverse range of products, immerse yourself in the rich tapestry of
            Nepali flavors, and discover the joys of cooking and dining the
            Nepali way, all from the comfort of your home.
          </p>
        </div>
      </section>
      <section id="contact">
        <SectionHeader
          leftImage={"/phone.jpg"}
          scaleleft={"scale-75"}
          lefttop={"top-10"}
          scaleright={"scale-50"}
          rightImage={"/chat.png"}
          heading={"Contact Us"}
          subheading={"Don't hesitate"}
        />
        <div className="text-gray-500 text-center flex flex-col gap-14">
          <div className="flex flex-col gap-5">
            <a href="tel:+9779867415031" className="text-3xl font-semibold">
              (+977) 9867415031
            </a>
            <p className="uppercase">Butwal-13 Devinagar, Rupandehi, Nepal</p>
          </div>
          <div className="font-semibold flex flex-col gap-1">
            <p>Sunday - Thurday: 8am - 7pm</p>
            <p>Friday: 8am - 10pm</p>
            <p>Closed Saturday</p>
          </div>
          <div className="flex gap-7 cursor-pointer text-6xl mx-auto">
            <FaFacebook color="#1877F2" />
            <FaSquareInstagram color="#f44747" />
            <FaSquareTwitter color="#1DA1F2" />
          </div>
        </div>
      </section>
    </>
  );
}
