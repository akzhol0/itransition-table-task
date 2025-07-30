import CheckRegistration from "@/components/main-page/CheckRegistration";
import Table from "@/components/main-page/Table";

export default function page() {
  return (
    <div>
      <div className="w-full min-h-[900px] flex justify-center items-center">
        <section className="w-[1000px] my-12 min-h-[300px] border border-gray-300 rounded-xl">
          <Table />
        </section>
      </div>
      <CheckRegistration />
    </div>
  );
}
