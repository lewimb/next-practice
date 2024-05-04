/**
 * kalo mau dijadiin client component,
 * dibagian paling atas file .tsx nya harus di kasih directive
 * "use client"
 *
 * kalo mau pake hooks, ato komponennya butuh reactivity
 * harus dijadiin client component
 */
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { type Digimon } from "@/lib/types";

type DigimonDetailPageParamsType = {
	name: string;
};

// di next server component bisa dijadiin async untuk bisa await process fetching data
export default async function DigimonDetailPage({
	/**
	 * dynamic route : namanya pake kurung kotak, cth : [name]
	 * nanti bakal diterima sbagai property dari params
	 * params bisa didestruktur dari props yang diterima komponen halaman (page.tsx)
	 */
	params,
}: {
	params: DigimonDetailPageParamsType;
}) {
	try {
		const { data } = await axios.get<Digimon[]>(
			`https://digimon-api.vercel.app/api/digimon/name/${params.name}`
		);
		const digimon = data[0];

		return (
			<div>
				<Image src={digimon.img} width={100} height={100} alt={digimon.name} />
				<p>name : {digimon.name}</p>
				<p>level : {digimon.level}</p>
			</div>
		);
	} catch (error) {
		// axios otomatis throw error kalo gagal,jadi errornya bisa ditangkep di catch
		if (error instanceof AxiosError) {
			return (
				<div>
					{error.code} {error.message}
				</div>
			);
		}
	}
}
