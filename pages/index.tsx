import Search from "@/components/search";
import BreadCrumb from "@/components/ui/BreadCrumb";

export default function Home() {
    return (
        <main>
            <div className="container">
                <div className="mt-8 mb-5">
                    <BreadCrumb
                        crumbs={[
                            {
                                name: 'ძიება',
                                url: '/'
                            },
                            {
                                name: 'იყიდება',
                                url: ''
                            },
                        ]}
                    />
                </div>

                <Search />
            </div>
        </main>
    );
}
