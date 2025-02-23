import { Wallet } from "@/models";
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

export async function getMyWallet(walletId: string): Promise<Wallet> {
  const response = await fetch(`http://localhost:3001/wallet/${walletId}`);
  return response.json();
}

//c233798c-44c2-4f42-af21-8e87228967e5
export default async function MyWalletList({searchParams}: {searchParams: Promise<{walletId: string}>}) {
  const {walletId} = await searchParams;
  const wallet = await getMyWallet(walletId);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar/Vender</TableHeadCell>
          </TableHead>
            <TableBody>
              {wallet.assets.map((walletAsset) => (
                <TableRow key={walletAsset._id}>
                  <TableCell>{walletAsset.asset.name}</TableCell>
                  <TableCell>R$ {walletAsset.asset.price}</TableCell>
                  <TableCell>{walletAsset.shares}</TableCell>
                  <TableCell>
                  <Button color='light'>Comprar/Vender</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
