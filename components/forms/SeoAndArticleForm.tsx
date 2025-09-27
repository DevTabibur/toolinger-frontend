"use client";

import { QuillField } from "@/form/QuillField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { ValidatedInput } from "./ValidatedInput";
import { ValidatedTextarea } from "./ValidatedTextarea";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ImageIcon, Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { ErrorMessage } from "formik";
function validateMetaTitle(value: string) {
    if (!value) return "Meta title is required";
    if (value.length < 10) return "Meta title too short";
    if (value.length > 60) return "Meta title too long";
    return undefined;
}

function validateCanonicalUrl(value: string) {
    if (!value) return undefined;
    if (
        !/^\/[a-zA-Z0-9\-\/]*$/.test(value) &&
        !/^https?:\/\/[^\s]+$/.test(value)
    ) {
        return "Must be a valid URL or start with /";
    }
    return undefined;
}

const SeoAndArticleForm = ({ formik, ogImage, setOgImage, ogImagePreview, setOgImagePreview, setOgImageError, dragActive, fileInputRef, handleChooseImageClick, handleRemoveImage, handleFileChange, handleDragOver, handleDragLeave, handleDrop }: any) => {
    return (
        <div className="space-y-6">
            <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="basic-seo"
                    // disabled={createContentOnly}
                    >
                        Basic SEO
                    </TabsTrigger>
                    <TabsTrigger value="social-media"
                    // disabled={createContentOnly}
                    >
                        Social Media
                    </TabsTrigger>
                    <TabsTrigger value="technical"
                    // disabled={createContentOnly}
                    >
                        Technical
                    </TabsTrigger>
                    {/* <TabsTrigger value="schema"
                    // disabled={createContentOnly}
                    >
                        Schema
                    </TabsTrigger> */}
                </TabsList>

                {/* Content Tab */}
                <TabsContent value="content" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Page Content</CardTitle>
                            <CardDescription>
                                Write and edit your page content using the rich text editor
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="title">Page Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={cn(
                                        formik.touched.title &&
                                        formik.errors.title &&
                                        "border-red-500"
                                    )}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="content">Content</Label>
                                <div className="border rounded-md">
                                    <QuillField
                                        value={formik.values.content}
                                        onChange={(value) =>
                                            formik.setFieldValue("content", value)
                                        }
                                    />
                                </div>
                                {formik.touched.content && formik.errors.content && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {formik.errors.content}
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                </TabsContent>

                {/* // Basic SEO Tab */}
                <TabsContent value="basic-seo" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic SEO</CardTitle>
                            <CardDescription>
                                Configure basic SEO settings for search engines
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>

                                    <Label htmlFor="metaTitle">Meta Title</Label>
                                    <Input
                                        id="metaTitle"
                                        name="metaTitle"
                                        value={formik.values.metaTitle || ""}

                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.metaTitle &&
                                        formik.errors.metaTitle && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.metaTitle}
                                            </p>
                                        )}
                                </div>

                                <div>
                                    <Label htmlFor="keywords">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        name="keywords"
                                        value={formik.values.keywords}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                    {formik.touched.keywords && formik.errors.keywords && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.keywords}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>


                                <Label htmlFor="metaDescription">Meta Description</Label>
                                <Textarea
                                    id="metaDescription"
                                    name="metaDescription"
                                    value={formik.values.metaDescription || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows={3}
                                    placeholder="Enter meta description (30-160 characters)"
                                />
                                {formik.touched.metaDescription &&
                                    formik.errors.metaDescription && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {formik.errors.metaDescription}
                                        </p>
                                    )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>

                                    <Label htmlFor="canonicalUrl">Canonical URL</Label>
                                    <Input
                                        id="canonicalUrl"
                                        name="canonicalUrl"
                                        value={formik.values.canonicalUrl || ""}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.canonicalUrl &&
                                        formik.errors.canonicalUrl && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.canonicalUrl}
                                            </p>
                                        )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="noindex"
                                        checked={!formik.values.noindex}
                                        onCheckedChange={(checked) =>
                                            formik.setFieldValue("noindex", !checked)
                                        }
                                    />
                                    <Label htmlFor="noindex" className="font-semibold">
                                        Index (Hide / Unindex from search engines)
                                    </Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>



                {/* Social Media Tab */}
                <TabsContent value="social-media" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Media</CardTitle>
                            <CardDescription>
                                Configure Open Graph and Twitter Card settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium mb-4">Open Graph</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="ogTitle">OG Title</Label>
                                            <Input
                                                id="ogTitle"
                                                name="ogTitle"
                                                value={formik.values.ogTitle}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.ogTitle &&
                                                formik.errors.ogTitle && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.ogTitle}
                                                    </p>
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="ogType">OG Type</Label>
                                            <Select
                                                value={formik.values.ogType}
                                                onValueChange={value => formik.setFieldValue("ogType", value)}
                                                name="ogType"
                                                defaultValue="website"
                                            >
                                                <SelectTrigger id="ogType">
                                                    <SelectValue placeholder="Select OG Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="website">Website</SelectItem>
                                                    <SelectItem value="article">Article</SelectItem>
                                                    <SelectItem value="book">Book</SelectItem>
                                                    <SelectItem value="profile">Profile</SelectItem>
                                                    <SelectItem value="music.song">Music Song</SelectItem>
                                                    <SelectItem value="music.album">Music Album</SelectItem>
                                                    <SelectItem value="music.playlist">Music Playlist</SelectItem>
                                                    <SelectItem value="music.radio_station">Music Radio Station</SelectItem>
                                                    <SelectItem value="video.movie">Video Movie</SelectItem>
                                                    <SelectItem value="video.episode">Video Episode</SelectItem>
                                                    <SelectItem value="video.tv_show">Video TV Show</SelectItem>
                                                    <SelectItem value="video.other">Video Other</SelectItem>
                                                    <SelectItem value="product">Product</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {formik.touched.ogType &&
                                                formik.errors.ogType && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.ogType}
                                                    </p>
                                                )}
                                        </div>

                                        <div>
                                            <Label htmlFor="ogSiteName">OG Site Name</Label>
                                            <Input
                                                id="ogSiteName"
                                                name="ogSiteName"
                                                value={formik.values.ogSiteName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}

                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="ogLocale">OG Locale</Label>
                                            <Select
                                                name="ogLocale"
                                                value={formik.values.ogLocale}
                                                onValueChange={value => formik.setFieldValue("ogLocale", value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Locale" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem defaultChecked value="en_US">English (US)</SelectItem>
                                                    <SelectItem value="en_GB">English (UK)</SelectItem>
                                                    <SelectItem value="es">Spanish</SelectItem>
                                                    <SelectItem value="fr">French</SelectItem>
                                                    <SelectItem value="de">German</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {formik.touched.ogLocale &&
                                                formik.errors.ogLocale && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.ogLocale}
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="ogDescription">OG Description</Label>
                                            <Textarea
                                                id="ogDescription"
                                                name="ogDescription"
                                                value={formik.values.ogDescription}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                rows={11}
                                            />
                                            {formik.touched.ogDescription &&
                                                formik.errors.ogDescription && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.ogDescription}
                                                    </p>
                                                )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                OG Image (1200x630px recommended)
                                            </label>
                                            <div
                                                className={`relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center bg-white dark:bg-gray-900 transition-colors duration-150 flex items-center justify-center overflow-hidden ${dragActive ? "border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""}`}
                                                style={{ width: "100%", aspectRatio: "1200/630", minHeight: "200px", cursor: ogImagePreview ? "default" : "pointer" }}
                                                onDragOver={ogImagePreview ? undefined : handleDragOver}
                                                onDragLeave={ogImagePreview ? undefined : handleDragLeave}
                                                onDrop={ogImagePreview ? undefined : handleDrop}
                                                onClick={ogImagePreview ? undefined : handleChooseImageClick}
                                            >
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    ref={fileInputRef}
                                                    style={{ display: "none" }}
                                                    onChange={handleFileChange}
                                                />
                                                {formik?.values?.ogImageUrl && (
                                                    <img
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${formik?.values?.ogImageUrl}`}
                                                        alt="OG"
                                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                        style={{ aspectRatio: "1200/630" }}
                                                    />
                                                )}
                                                {ogImagePreview ? (
                                                    <>
                                                        <img
                                                            src={ogImagePreview || "/placeholder.svg"}
                                                            alt="OG"
                                                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                            style={{ aspectRatio: "1200/630" }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute top-2 right-2 z-10"
                                                            onClick={handleRemoveImage}
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
                                                        <ImageIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                            {dragActive ? "Drop image here..." : "Upload OG image"}
                                                        </p>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                                            tabIndex={-1}
                                                        >
                                                            <Upload className="h-4 w-4 mr-2" />
                                                            Choose Image
                                                        </Button>
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Drag & drop or click to select</p>
                                                    </div>
                                                )}
                                            </div>
                                            {/* <ErrorMessage name="ogImage" component="div" className="text-red-500 dark:text-red-400 text-sm mt-1" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h3 className="text-lg font-medium mb-4">Twitter Card</h3>
                                <div className="space-y-4">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div>
                                            <Label htmlFor="twitterCard">Card Type</Label>
                                            <Select
                                                name="twitterCard"
                                                value={formik.values.twitterCard}
                                                onValueChange={value => formik.setFieldValue("twitterCard", value)}
                                            >
                                                <SelectTrigger
                                                    className={cn(
                                                        "w-full",
                                                        formik.touched.twitterCard && formik.errors.twitterCard && "border-red-500"
                                                    )}
                                                >
                                                    <SelectValue placeholder="Select card type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="summary">Summary</SelectItem>
                                                    <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                                                    <SelectItem value="app">App</SelectItem>
                                                    <SelectItem value="player">Player</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {formik.touched.twitterCard &&
                                                formik.errors.twitterCard && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.twitterCard}
                                                    </p>
                                                )}
                                        </div>

                                        <div>
                                            <Label htmlFor="twitterSite">Twitter Site Handle</Label>
                                            <Input
                                                id="twitterSite"
                                                name="twitterSite"
                                                value={formik.values.twitterSite}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="@toolinger"
                                            />
                                            {formik.touched.twitterSite &&
                                                formik.errors.twitterSite && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.twitterSite}
                                                    </p>
                                                )}
                                        </div>
                                        <div>
                                            <Label htmlFor="twitterCreator">Twitter Creator Handle</Label>
                                            <Input
                                                id="twitterCreator"
                                                name="twitterCreator"
                                                value={formik.values.twitterCreator}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="@toolinger"
                                            />
                                            {formik.touched.twitterCreator &&
                                                formik.errors.twitterCreator && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {formik.errors.twitterCreator}
                                                    </p>
                                                )}
                                        </div>

                                       
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Twitter Image (1200x630px recommended)
                                        </label>
                                        <div
                                            className={`relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-center bg-white dark:bg-gray-900 transition-colors duration-150 flex items-center justify-center overflow-hidden ${dragActive ? "border-blue-400 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30" : ""}`}
                                            style={{ width: "100%", aspectRatio: "1200/630", minHeight: "200px", cursor: ogImagePreview ? "default" : "pointer" }}
                                            onDragOver={ogImagePreview ? undefined : handleDragOver}
                                            onDragLeave={ogImagePreview ? undefined : handleDragLeave}
                                            onDrop={ogImagePreview ? undefined : handleDrop}
                                            onClick={ogImagePreview ? undefined : handleChooseImageClick}
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileChange}
                                            />
                                            {formik?.values?.twitterImageUrl && (
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_API}/${formik?.values?.twitterImageUrl}`}
                                                    alt="Twitter"
                                                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                    style={{ aspectRatio: "1200/630" }}
                                                />
                                            )}
                                            {twitterImagePreview ? (
                                                <>
                                                    <img
                                                        src={ogImagePreview || "/placeholder.svg"}
                                                        alt="Twitter"
                                                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                                        style={{ aspectRatio: "1200/630" }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        className="absolute top-2 right-2 z-10"
                                                        onClick={handleRemoveImage}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none">
                                                    <ImageIcon className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-500 mb-2" />
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                        {dragActive ? "Drop image here..." : "Upload Twitter image"}
                                                    </p>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                                        tabIndex={-1}
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Choose Image
                                                    </Button>
                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Drag & drop or click to select</p>
                                                </div>
                                            )}
                                        </div>
                                    </div> */}


                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Technical Tab */}
                <TabsContent value="technical" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Technical SEO</CardTitle>
                            <CardDescription>
                                Configure technical SEO settings for search engines
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="changefreq">Change Frequency</Label>
                                    <Select
                                        value={formik.values.changefreq}
                                        onValueChange={(value) =>
                                            formik.setFieldValue("changefreq", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select frequency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="always">Always</SelectItem>
                                            <SelectItem value="hourly">Hourly</SelectItem>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                            <SelectItem value="never">Never</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formik.touched.changefreq &&
                                        formik.errors.changefreq && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.changefreq}
                                            </p>
                                        )}
                                </div>

                                <div>
                                    <Label htmlFor="priority">Priority (0.0 - 1.0)</Label>
                                    <Input
                                        id="priority"
                                        name="priority"
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="1"
                                        value={formik.values.priority}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={cn(
                                            formik.touched.priority &&
                                            formik.errors.priority &&
                                            "border-red-500"
                                        )}
                                    />
                                    {formik.touched.priority &&
                                        formik.errors.priority && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {formik.errors.priority}
                                            </p>
                                        )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Schema Tab */}
                {/* <TabsContent value="schema" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>JSON-LD Schema</CardTitle>
            <CardDescription>
              Add structured data to help search engines understand your
              content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <JsonSchemaEditor
                label="JSON-LD Schema"
                value={formik.values.schema}
                onChange={(value: any) =>
                  formik.setFieldValue("schema", value)
                }
                onBlur={() => formik.setFieldTouched("schema", true)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={formatJsonSchema}
                className="flex items-center space-x-2"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Format JSON</span>
              </Button>
              <p className="text-sm text-gray-500">
                Use valid JSON format for structured data
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent> */}
            </Tabs>
        </div>
    )
}

export default SeoAndArticleForm










