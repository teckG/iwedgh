import { Input } from "@/components/ui/input";
import { Select } from "@headlessui/react";
import db_connection from "../../../db";
import Clients from "../../../models/clients";
import { revalidatePath } from "next/cache";
import Vendor from "../../../models/vendor";
import Link from "next/link";

async function AddClient() {
  await db_connection();
  const emails = await Vendor.find();

  const addClient = async (formData) => {
    "use server";
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const category = formData.get("category");
    const email = formData.get("email");

    try {
      await Clients.create({
        firstName,
        lastName,
        category,
        email,
      });
    } catch (error) {
      return 0;
    }
    revalidatePath("/addclient");
  };

  return (
    <>
      <div className="container mx-auto bg-gray-400 py-8">
        <form action={addClient}>
          first name :{" "}
          <Input type="text" name="firstName" placeholder="Cephas" required />
          last :{" "}
          <Input type="text" name="lastName" placeholder="Tsatsu" required />
          <br />
          cate:{" "}
          <Select name="category" required>
            <option value="Cook">Cook</option>
            <option value="MC">MC</option>
            <option value="Photoo">Photoo</option>
            <option value="Other">Other</option>
          </Select>
          <br />
          <br />
          email:{" "}
          <Select name="email" required>
          {emails.map((vendor, index) => {
            return <option key={index} value={vendor.email}> {vendor.email} </option>;
          })}
          </Select>
          <br />

          <button className="bg-slate-200 py-2 px-6 mt-4" type="submit">
            Add
          </button>
        </form>
      </div>
      <div className="py-2 px-6 bg-blue-400 container">
        <ul>
          {emails.map((vendor, index) => {
            return <Link key={index} href={`/vendors/${vendor._id}`} className="block"> {vendor.businessName} </Link> ;
          })}
        </ul>
      </div>
    </>
  );
}

export default AddClient;
