import Link from "next/link";

export default function Home() {
	return (
		<div>
			<Link href="/login" className="btn btn-primary">
				Login
			</Link>
		</div>
	);
}
