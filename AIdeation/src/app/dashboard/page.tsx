import React from 'react'
import Link from "next/link";
import { Button } from '@/components/ui/button';
import {ArrowLeft} from "lucide-react";
import { UserButton, auth } from '@clerk/nextjs';
import { Separator } from '@/components/ui/separator';
import CreateNoteDialog from '@/components/CreateNoteDialog';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { $notes } from '@/lib/db/schema';
import Image from 'next/image';

type Props = {}

const DashboardPage = async (props: Props) => {

    const {userId} = auth();
    const notes = await db.select().from($notes).where(
        eq($notes.userId, userId!)
    )
  return (
    <>
        <div className="grainy min-h-screen">
            <div className="max-w-7xl mx-auto p-9">
                <div className="h-14 "></div>
                <div className="flex justify-between items-center md:flex-row flex-col">
                    <div className="flex items-center">
                        <Link href="/">
                            <Button className="bg-green-600" size="sm">
                                <ArrowLeft className="mr-4 w-4h-4" />
                                Back
                            </Button>
                        </Link>
                        <div className="w-4"></div>
                        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
                        <div className="w-4"></div>
                        <UserButton />
                    </div>
                </div>
                <div className="h-8"></div>
                <Separator />
                <div className="h-8"></div>
                {notes.length === 0 && (
                <div className="text-center">
                    <h2 className="text-xl text-gray-500">No notes yet. Start by adding a note!</h2>
                </div>
                )}
                <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
                    <CreateNoteDialog />
                    {notes.map(note => {
                        return (
                            <a href={`/notebook/${note.id}`} key={note.id}>
                                <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                                    <Image 
                                    width={400}
                                    height={200}
                                    alt={note.name}
                                    src={note.imageUrl || ''}
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{note.name}</h3>
                                        <div className="h-1"></div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(note.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default DashboardPage